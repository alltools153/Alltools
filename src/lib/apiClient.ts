/**
 * Unified API Client for AllToolss
 * Prefers Next.js API routes (always available), then Python FastAPI via /api/py/*.
 */

export async function fetchAgeData(birthDate: string, targetDate?: string) {
  const params = new URLSearchParams({ birthDate });
  if (targetDate) params.append('targetDate', targetDate);

  try {
    const res = await fetch(`/api/age?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Next.js age API failed, trying FastAPI:', err);
  }

  try {
    const res = await fetch(`/api/py/age/calculate?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.error('Age API request failed:', err);
  }

  return null;
}

export async function scanUrlSecurity(url: string, deepScan = false) {
  try {
    const res = await fetch('/api/vapt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, deepScan }),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Next.js VAPT API failed, trying FastAPI:', err);
  }

  try {
    const res = await fetch('/api/py/vapt/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, deepScan }),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.error('VAPT request failed:', err);
  }

  return null;
}

export async function fetchBengaliToday() {
  try {
    const res = await fetch('/api/bengali');
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Next.js Bengali API failed, trying FastAPI:', err);
  }

  try {
    const res = await fetch('/api/py/bengali/today');
    if (res.ok) return await res.json();
  } catch (err) {
    console.error('Bengali API failed:', err);
  }

  return null;
}

export async function fetchSeoKeywords(category?: string, lang?: string) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (lang) params.append('lang', lang);
  const query = params.toString();

  try {
    const res = await fetch(`/api/seo${query ? `?${query}` : ''}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Next.js SEO API failed, trying FastAPI:', err);
  }

  try {
    const res = await fetch(`/api/py/seo/keywords${query ? `?${query}` : ''}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.error('SEO API failed:', err);
  }

  return null;
}
