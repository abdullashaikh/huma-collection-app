/**
 * On-demand Razorpay SDK loader.
 * Prevents loading 240+ KB of Razorpay checkout scripts on pages where payment is not active.
 * Caches in-flight load promises, prevents duplicate script tags, and supports safe retries on network error.
 */

let razorpayPromise: Promise<boolean> | null = null;

export function isRazorpayLoaded(): boolean {
  return typeof window !== 'undefined' && Boolean((window as any).Razorpay);
}

export function loadRazorpay(): Promise<boolean> {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  // If already loaded on window, resolve immediately
  if ((window as any).Razorpay) {
    return Promise.resolve(true);
  }

  // Reuse in-flight loading promise to avoid duplicate script injection
  if (razorpayPromise) {
    return razorpayPromise;
  }

  razorpayPromise = new Promise((resolve) => {
    // Check if script element already exists in DOM
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existing) {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      existing.addEventListener('load', () => resolve(true), { once: true });
      existing.addEventListener(
        'error',
        () => {
          razorpayPromise = null; // Allow retry on failure
          resolve(false);
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      resolve(Boolean((window as any).Razorpay));
    };

    script.onerror = () => {
      // Allow clean retry on error by clearing the promise and removing the broken script tag
      razorpayPromise = null;
      script.remove();
      resolve(false);
    };

    document.head.appendChild(script);
  });

  return razorpayPromise;
}
