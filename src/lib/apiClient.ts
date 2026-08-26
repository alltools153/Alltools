/**
 * Unified API Client for AllTools
 * Communicates with Python FastAPI Backend (`/api/py/*` or direct)
 * and falls back gracefully to Next.js API Routes.
 */

export async function fetchAgeData(birthDate: string, targetDate?: string) {
  try {
    const params = new URLSearchParams({ birthDate });
    if (targetDate) params.append('targetDate', targetDate);

    // Try Python FastAPI backend first
    const res = await fetch(`/api/py/age/calculate?${params.toString()}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('FastAPI backend not reached, using local engine fallback:', err);
  }

  // Fallback to Next.js internal API route
  try {
    const res = await fetch(`/api/age?birthDate=${encodeURIComponent(birthDate)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('API request failed:', err);
  }

  return null;
}

export async function scanUrlSecurity(url: string, deepScan = false) {
  try {
    // Try Python FastAPI backend
    const res = await fetch('/api/py/vapt/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, deepScan }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('FastAPI VAPT endpoint not reached, falling back:', err);
  }

  // Fallback to Next.js internal API route
  try {
    const res = await fetch('/api/vapt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, deepScan }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('VAPT request failed:', err);
  }

  return null;
}

export async function fetchBengaliToday() {
  try {
    const res = await fetch('/api/py/bengali/today');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('FastAPI Bengali endpoint not reached, falling back:', err);
  }

  try {
    const res = await fetch('/api/bengali');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Bengali API failed:', err);
  }

  return null;
}

export async function fetchSeoKeywords(category?: string, lang?: string) {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (lang) params.append('lang', lang);

    const res = await fetch(`/api/py/seo/keywords?${params.toString()}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('FastAPI SEO endpoint not reached, falling back:', err);
  }

  try {
    const res = await fetch('/api/seo');
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('SEO API failed:', err);
  }

  return null;
}
