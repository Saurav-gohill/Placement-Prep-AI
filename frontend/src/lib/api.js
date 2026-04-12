import { supabase } from './supabaseClient';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';

/**
 * Wrapper for standard fetch that injects the current Supabase JWT token.
 * 
 * @param {string} endpoint - The API endpoint starting with '/' (e.g., '/resume/analyze')
 * @param {object} options - Standard fetch options (method, headers, body, etc.)
 */
export async function fetchApi(endpoint, options = {}) {
  // Get active session from Supabase
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    throw new Error("No active session found. Please login.");
  }

  const token = session.access_token;
  
  // Set up Authorization header
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  // If sending JSON and user hasn't explicitly overridden the Content-Type
  if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const url = `${BACKEND_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, { ...options, headers });
    
    // Attempt standard JSON parsing except if the API response crashes
    const contentType = response.headers.get("content-type");
    let responseData = null;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      responseData = await response.json();
    } else {
        responseData = await response.text();
    }

    if (!response.ok) {
      // Throw with backend specific error payload if exists
      throw new Error((responseData && responseData.detail) || response.statusText || 'Unknown backend error');
    }

    return responseData;
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}
