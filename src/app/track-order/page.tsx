'use client';

import { CheckCircle2, Clock, Package, Search, Truck } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { fetchApi } from '../../lib/api';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get('orderNumber') || '';

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const steps = ['PENDING', 'CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED'];

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderNumber.trim()) {
      setErrorMsg('Please enter your order number');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg('Please enter your 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetchApi<any>(`/orders/track/${orderNumber.trim()}?phone=${phone.trim()}`);
      if (res.success && res.data) {
        setOrderData(res.data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'No order found with these credentials.');
      setOrderData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('huma_customer_user');
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (u.phone) setPhone(u.phone.replace(/[^0-9]/g, '').slice(-10));
      } catch (e) {}
    }
  }, []);

  const currentStepIdx = orderData ? steps.indexOf(orderData.orderStatus) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-serif text-3xl font-bold text-brand-obsidian">Track Your Modest Order</h1>
        <p className="text-xs text-stone-500">
          Enter your order reference number and registered mobile number to view live shipment progress.
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleTrack} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Order Number *
            </label>
            <input
              type="text"
              placeholder="e.g. HHC-2026-123456"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono uppercase focus:outline-none focus:border-brand-gold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              placeholder="10-digit mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono focus:outline-none focus:border-brand-gold"
              required
            />
          </div>
        </div>

        {errorMsg && <p className="text-xs text-red-500 text-center">{errorMsg}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-brand-obsidian text-white rounded-xl text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          <span>{isLoading ? 'Retrieving Status...' : 'Track Shipment Status'}</span>
        </button>
      </form>

      {/* Result Status */}
      {orderData && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-luxury space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
            <div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Order Reference</span>
              <h3 className="font-mono text-lg font-bold text-brand-obsidian">{orderData.orderNumber}</h3>
              <p className="text-xs text-stone-500">Customer: {orderData.customerName}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Order Status</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-brand-emerald-light text-brand-emerald">
                {orderData.orderStatus}
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div className="py-4">
            <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center">
              {steps.map((st, i) => {
                const isPassed = i <= currentStepIdx;
                return (
                  <div key={st} className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isPassed ? 'bg-brand-emerald text-white' : 'bg-stone-200 text-stone-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-stone-600 mt-1 uppercase tracking-tight">
                      {st}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carrier & Tracking */}
          {orderData.trackingNumber && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
              <Truck className="w-6 h-6 text-brand-gold-dark" />
              <div>
                <span className="text-xs font-bold text-brand-obsidian block">
                  Carrier: {orderData.carrierName || 'BlueDart Express'}
                </span>
                <span className="text-xs font-mono text-stone-600">AWB Tracking: {orderData.trackingNumber}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-stone-500">Loading order tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
