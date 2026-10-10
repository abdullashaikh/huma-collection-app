const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'server_session';
  let sid = localStorage.getItem('huma_session_id');
  if (!sid) {
    sid = 'sid_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('huma_session_id', sid);
  }
  return sid;
}

export function getCustomerToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('huma_customer_token');
}

export function setCustomerToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('huma_customer_token', token);
  }
}

export function removeCustomerToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('huma_customer_token');
    localStorage.removeItem('huma_customer_user');
  }
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data: T; message?: string; meta?: any }> {
  const sessionId = getSessionId();
  const token = getCustomerToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Session-ID': sessionId,
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_URL}${cleanEndpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    const json = await res.json();

    if (!res.ok) {
      const errorMsg = json?.error?.message || json?.message || 'Network request failed';
      throw new Error(errorMsg);
    }

    return json;
  } catch (err: any) {
    console.error(`API Error on ${endpoint}:`, err.message);
    throw err;
  }
}
