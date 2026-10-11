'use client';

import { ArrowRight, CheckCircle2, Lock, MapPin, MessageCircle, Phone, ShieldCheck, Sparkles, Store, Tag, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchApi, getSessionId } from '../../lib/api';
import { useCart } from '../../lib/cart-context';
import { getMediaUrl } from '../../lib/media';

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Online purchasing is planned to launch in November 2026.
// Keep false during showcase mode; flip to true when online orders go live.
const ONLINE_ORDERING_ENABLED = false;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, refreshCart } = useCart();

  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || 'Hamid Shaikh';
  const storePhone = process.env.NEXT_PUBLIC_STORE_PHONE || '8200617009';
  const formattedPhone = process.env.NEXT_PUBLIC_STORE_PHONE_FORMATTED || '+91 82006 17009';
  const mapsUrl = process.env.NEXT_PUBLIC_MAPS_URL || 'https://maps.app.goo.gl/Uocg3MLVbusi17NG6';
  const launchDate = process.env.NEXT_PUBLIC_ONLINE_LAUNCH_DATE || 'November 2026';
  const whatsappNum = (process.env.NEXT_PUBLIC_WHATSAPP || '+918200617009').replace(/[^0-9]/g, '');

  // Form State (preserved for when online ordering launches)
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD'>('RAZORPAY');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [customerNotes, setCustomerNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Auto-fill customer if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('huma_customer_user');
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.firstName) setCustomerName(`${u.firstName} ${u.lastName || ''}`.trim());
        if (u.phone) setCustomerPhone(u.phone.replace(/[^0-9]/g, '').slice(-10));
        if (u.email) setCustomerEmail(u.email);
      } catch (e) {}
    }
  }, []);

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const discountAmount = appliedCoupon?.discountAmount || 0;
  const shippingCharge = subtotal >= 1499 || subtotal === 0 ? 0 : 99;
  const codCharge = paymentMethod === 'COD' ? 50 : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCharge + codCharge);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplyingCoupon(true);
    setCouponError('');
    try {
      const res = await fetchApi<any>('/coupons/apply', {
        method: 'POST',
        body: JSON.stringify({ code: couponCode.trim(), subtotal }),
      });
      if (res.success && res.data) {
        setAppliedCoupon(res.data);
      }
    } catch (err: any) {
      setCouponError(err.message || 'Invalid coupon code');
      setAppliedCoupon(null);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setSubmitError('Your shopping bag is empty.');
      return;
    }
    if (!customerPhone || customerPhone.length < 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!pincode || pincode.length !== 6) {
      setSubmitError('Please enter a valid 6-digit postal pincode.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const sessionId = getSessionId();
      const payload = {
        sessionId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        shippingAddress: {
          fullName: customerName.trim(),
          phone: customerPhone.trim(),
          addressLine1: addressLine1.trim(),
          addressLine2: addressLine2.trim() || undefined,
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
        },
        paymentMethod,
        couponCode: appliedCoupon?.code || undefined,
        customerNotes: customerNotes.trim() || undefined,
      };

      const orderRes = await fetchApi<any>('/orders', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!orderRes.success || !orderRes.data) {
        throw new Error(orderRes.message || 'Order creation failed');
      }

      const { orderNumber, razorpayOrderId, razorpayKeyId } = orderRes.data;

      // Handle Online Payment (Razorpay)
      if (paymentMethod === 'RAZORPAY') {
        if (!window.Razorpay) {
          throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
        }

        const options = {
          key: razorpayKeyId,
          amount: Math.round(totalAmount * 100),
          currency: 'INR',
          name: 'Huma Hijab Collection',
          description: `Order ${orderNumber}`,
          order_id: razorpayOrderId,
          prefill: {
            name: customerName,
            contact: customerPhone,
            email: customerEmail || 'customer@humacollection.in',
          },
          theme: {
            color: '#1C1B1A',
          },
          handler: async function (response: any) {
            try {
              // Server-side verification
              const verifyRes = await fetchApi<any>('/payments/razorpay/verify', {
                method: 'POST',
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              });

              if (verifyRes.success) {
                await refreshCart();
                router.push(`/order-confirmation/${orderNumber}`);
              }
            } catch (vErr: any) {
              alert('Payment verification failed: ' + vErr.message);
            }
          },
          modal: {
            ondismiss: function () {
              setIsSubmitting(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Cash on Delivery Order Confirmed immediately
        await refreshCart();
        router.push(`/order-confirmation/${orderNumber}`);
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!ONLINE_ORDERING_ENABLED) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
        <div className="bg-gradient-to-b from-brand-ivory via-white to-brand-ivory rounded-3xl p-8 sm:p-12 border border-brand-gold/30 shadow-luxury space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold-dark text-xs font-bold uppercase tracking-widest mx-auto">
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span>Launch Notice</span>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-obsidian">
              Online Shopping Coming Soon!
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              Explore our collection in-store today. Online shopping is expected to launch in{' '}
              <strong className="text-brand-obsidian">{launchDate}</strong>.
            </p>
          </div>

          {/* Store & Owner Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left pt-2">
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-sand flex items-center justify-center text-brand-obsidian flex-shrink-0">
                <Store className="w-5 h-5 text-brand-gold-dark" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Boutique Owner</p>
                <p className="text-sm font-bold text-brand-obsidian">{ownerName}</p>
                <p className="text-xs text-stone-500">Huma Hijab Collection</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-sand flex items-center justify-center text-brand-obsidian flex-shrink-0">
                <Phone className="w-5 h-5 text-brand-gold-dark" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Direct Helpline</p>
                <a
                  href={`tel:+91${storePhone}`}
                  className="text-sm font-bold text-brand-obsidian hover:text-brand-gold-dark underline"
                >
                  {formattedPhone}
                </a>
                <p className="text-xs text-stone-500">Call for piece availability</p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={`tel:+91${storePhone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-obsidian text-brand-gold-light hover:bg-black font-semibold text-xs tracking-wide shadow-md transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call Store ({storePhone})</span>
            </a>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 font-semibold text-xs tracking-wide border border-stone-300 transition-all active:scale-95"
            >
              <MapPin className="w-4 h-4 text-brand-gold-dark" />
              <span>Get Directions (Google Maps)</span>
            </a>

            <Link
              href="/burqa"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-stone-700 hover:text-brand-obsidian font-semibold text-xs tracking-wide border border-stone-200 transition-all active:scale-95"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-brand-obsidian">Your bag is empty</h2>
        <p className="text-xs text-stone-500 mt-2">Add your desired Burqa pieces before proceeding to checkout.</p>
        <Link
          href="/burqa"
          className="mt-6 inline-block px-6 py-3 bg-brand-obsidian text-white rounded-xl text-xs font-semibold"
        >
          Explore Burqa Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-obsidian">Express Checkout</h1>
        <p className="text-xs text-stone-500 mt-0.5">Safe & encrypted 256-bit transactional checkout</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Shipping Address & Details (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Contact Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian flex items-center gap-2">
              <span>1. Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayesha Shaikh"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Mobile Number (for Order Updates) *
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-stone-500 border-r border-stone-200 pr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full pl-14 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Email Address (Optional for Invoice)
                </label>
                <input
                  type="email"
                  placeholder="ayesha@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-gold-dark" />
              <span>2. Delivery Address</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Address Line 1 (Flat, House No., Building) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Flat 402, Al-Noor Heights"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                  Address Line 2 (Street, Area, Landmark)
                </label>
                <input
                  type="text"
                  placeholder="Near Jama Masjid, Main Market"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    Postal Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="400008"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-brand-obsidian flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-gold-dark" />
              <span>3. Payment Option</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Online Payment */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'RAZORPAY'
                    ? 'border-brand-obsidian bg-brand-sand/30 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'RAZORPAY'}
                  onChange={() => setPaymentMethod('RAZORPAY')}
                  className="mt-1"
                />
                <div>
                  <span className="font-bold text-xs text-brand-obsidian block">Online Payment (Recommended)</span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    Instant UPI (GPay, PhonePe, Paytm), Credit/Debit Cards & NetBanking via Razorpay.
                  </span>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-brand-emerald-light text-brand-emerald">
                    Zero Extra Fee
                  </span>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                  paymentMethod === 'COD'
                    ? 'border-brand-obsidian bg-brand-sand/30 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1"
                />
                <div>
                  <span className="font-bold text-xs text-brand-obsidian block">Cash on Delivery (COD)</span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    Pay securely in cash or QR scan to courier delivery agent upon receiving your order.
                  </span>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-600">
                    +₹50 Handling Fee
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Review (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-luxury space-y-6 sticky top-28">
            <h3 className="font-serif text-lg font-bold text-brand-obsidian pb-3 border-b border-stone-100">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Items mini list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={getMediaUrl(item.imageUrl) || 'https://images.unsplash.com/photo-1584282479901-705a6104bc99?auto=format&fit=crop&w=200&q=80'}
                      alt={item.productName}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h4 className="font-semibold text-brand-obsidian line-clamp-1">{item.productName}</h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-brand-obsidian">₹{item.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Coupon Form */}
            <div className="pt-2 border-t border-stone-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. WELCOME10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs uppercase font-mono focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isApplyingCoupon || !couponCode.trim()}
                  className="px-4 py-2 bg-brand-obsidian text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors disabled:opacity-50"
                >
                  {isApplyingCoupon ? '...' : 'Apply'}
                </button>
              </div>

              {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-[11px] text-brand-emerald font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Coupon {appliedCoupon.code} applied! Saved ₹{appliedCoupon.discountAmount}</span>
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-brand-obsidian">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-brand-emerald font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="font-semibold text-brand-emerald">
                  {shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}
                </span>
              </div>

              {codCharge > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>COD Handling Fee</span>
                  <span className="font-semibold text-brand-obsidian">₹{codCharge}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-brand-obsidian pt-3 border-t border-stone-100">
                <span>Final Payable</span>
                <span className="text-xl">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {submitError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                {submitError}
              </div>
            )}

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-obsidian hover:bg-black text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 group"
            >
              <Lock className="w-4 h-4 text-brand-gold" />
              <span>
                {isSubmitting
                  ? 'Processing Order...'
                  : paymentMethod === 'RAZORPAY'
                  ? `Pay ₹${totalAmount.toLocaleString('en-IN')} via Razorpay`
                  : `Confirm Cash on Delivery (₹${totalAmount.toLocaleString('en-IN')})`}
              </span>
            </button>

            <p className="text-[10px] text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Secure Checkout • Huma Hijab Collection</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
