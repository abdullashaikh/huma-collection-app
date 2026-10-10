'use client';

import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { fetchApi, setCustomerToken } from '../../lib/api';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export function OtpModal({ isOpen, onClose, onSuccess }: OtpModalProps) {
  const [step, setStep] = useState<'PHONE' | 'OTP' | 'UNLOCKED'>('PHONE');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [devOtpHint, setDevOtpHint] = useState<string | null>(null);
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Focus first digit when switching to OTP step
  useEffect(() => {
    if (step === 'OTP') {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetchApi<{ devOtp?: string }>('/auth/customer/otp/send', {
        method: 'POST',
        body: JSON.stringify({ phone }),
      });
      if (res.success) {
        if (res.data?.devOtp) {
          setDevOtpHint(res.data.devOtp);
        }
        setStep('OTP');
        setTimer(45);
        setCanResend(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/[^0-9]/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      if (digits.length === 6) {
        triggerVerification(newOtp.join(''));
      }
      return;
    }

    const digit = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto advance focus
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 filled
    if (digit && index === 5 && newOtp.every((d) => d !== '')) {
      triggerVerification(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const triggerVerification = async (codeToVerify: string) => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetchApi<{ user: any; accessToken: string }>('/auth/customer/otp/verify', {
        method: 'POST',
        body: JSON.stringify({
          phone,
          otp: codeToVerify,
          fullName: fullName.trim() || undefined,
        }),
      });

      if (res.success && res.data) {
        setCustomerToken(res.data.accessToken);
        localStorage.setItem('huma_customer_user', JSON.stringify(res.data.user));

        // Unlock Animation Celebration
        setStep('UNLOCKED');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#1B4D3E', '#1A1A1A', '#E8DCB8'],
        });

        setTimeout(() => {
          onSuccess(res.data.user);
          onClose();
        }, 1600);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid or expired OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const filledCount = otp.filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300">
      <div className="relative w-full max-w-md overflow-hidden bg-brand-cream border border-brand-gold/30 rounded-3xl shadow-2xl p-6 sm:p-8 text-brand-dark">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Orbit Animation Shield (Viral Reference: agentguyram) */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Outer Orbit Track with rotating particle */}
            <div
              className={`absolute inset-0 rounded-full border border-dashed border-brand-gold/40 ${
                step === 'UNLOCKED' ? 'border-brand-emerald scale-110' : 'animate-orbit-slow'
              } transition-all duration-700`}
            >
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-brand-gold shadow-gold-glow flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            {/* Inner Counter-Orbit Track */}
            <div
              className={`absolute inset-2.5 rounded-full border border-brand-gold/20 ${
                step === 'UNLOCKED' ? 'border-brand-emerald' : 'animate-orbit-reverse'
              } transition-all duration-700`}
            >
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-obsidian" />
            </div>

            {/* Center Lock / Crest Emblem */}
            <div
              className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-luxury ${
                step === 'UNLOCKED'
                  ? 'bg-brand-emerald text-white scale-110 shadow-lg'
                  : 'bg-brand-obsidian text-brand-gold'
              }`}
            >
              {step === 'UNLOCKED' ? (
                <CheckCircle2 className="w-8 h-8 animate-unlock-burst" />
              ) : step === 'OTP' ? (
                <ShieldCheck className="w-8 h-8 animate-pulse-glow" />
              ) : (
                <Lock className="w-8 h-8" />
              )}
            </div>
          </div>

          <h3 className="mt-4 font-serif text-2xl font-bold tracking-wide text-brand-obsidian text-center">
            {step === 'UNLOCKED'
              ? 'Unlocked & Verified'
              : step === 'OTP'
              ? 'Security Verification'
              : 'Sign In / Register'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 text-center max-w-xs">
            {step === 'UNLOCKED'
              ? 'Welcome back to Huma Hijab Collection'
              : step === 'OTP'
              ? `Enter the 6-digit access code sent to ${phone}`
              : 'Access your modest bag, saved addresses, and express checkout'}
          </p>
        </div>

        {/* STEP 1: Phone input */}
        {step === 'PHONE' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wider">
                Full Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Ayesha Shaikh"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1.5 uppercase tracking-wider">
                Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-sm font-semibold text-stone-500 border-r border-stone-200 pr-2">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full pl-16 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium tracking-wider focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                  required
                />
              </div>
            </div>

            {errorMsg && <p className="text-xs text-red-500 text-center">{errorMsg}</p>}

            <button
              type="submit"
              disabled={isLoading || phone.length < 10}
              className="w-full py-3.5 bg-brand-obsidian text-white rounded-xl text-sm font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-md group"
            >
              <span>{isLoading ? 'Generating Code...' : 'Get Verification Code'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}

        {/* STEP 2: 6-Digit OTP Box Grid (Viral Theme) */}
        {step === 'OTP' && (
          <div className="space-y-5">
            {/* Dev Hint if running locally */}
            {devOtpHint && (
              <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-xl p-2.5 text-center">
                <span className="text-[11px] font-semibold text-brand-gold-dark flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Dev Test OTP: <strong className="font-mono text-sm tracking-widest text-brand-obsidian">{devOtpHint}</strong>
                </span>
              </div>
            )}

            {/* 6 Digit Input Boxes */}
            <div className="flex justify-between gap-2 sm:gap-2.5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-11 h-14 sm:w-12 sm:h-16 text-center text-xl font-bold font-mono rounded-xl border bg-white transition-all shadow-sm focus:outline-none ${
                    digit
                      ? 'border-brand-gold bg-brand-sand/30 text-brand-obsidian shadow-gold-glow/20'
                      : 'border-stone-200 text-stone-700 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30'
                  }`}
                />
              ))}
            </div>

            {/* Progress indicator */}
            <div className="flex items-center justify-center space-x-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i < filledCount ? 'w-5 bg-brand-gold' : 'w-2 bg-stone-200'
                  }`}
                />
              ))}
            </div>

            {errorMsg && <p className="text-xs text-red-500 text-center">{errorMsg}</p>}

            {/* Actions & Resend */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="hover:text-brand-obsidian transition-colors underline"
              >
                Change Number
              </button>

              <div>
                {canResend ? (
                  <button
                    type="button"
                    onClick={() => {
                      setTimer(45);
                      setCanResend(false);
                      handleSendOtp({ preventDefault: () => {} } as any);
                    }}
                    className="font-semibold text-brand-gold-dark hover:underline"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span>Resend in <strong className="font-mono text-stone-700">{timer}s</strong></span>
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={isLoading || filledCount < 6}
              onClick={() => triggerVerification(otp.join(''))}
              className="w-full py-3.5 bg-brand-obsidian text-white rounded-xl text-sm font-semibold hover:bg-black transition-all flex items-center justify-center space-x-2 disabled:opacity-50 shadow-md"
            >
              <span>{isLoading ? 'Verifying...' : 'Verify & Continue'}</span>
            </button>
          </div>
        )}

        {/* STEP 3: Unlocked Success State */}
        {step === 'UNLOCKED' && (
          <div className="text-center py-4 space-y-2">
            <p className="text-sm font-semibold text-brand-emerald">Verification Complete!</p>
            <p className="text-xs text-stone-500">Redirecting to your exclusive shopping experience...</p>
          </div>
        )}
      </div>
    </div>
  );
}
