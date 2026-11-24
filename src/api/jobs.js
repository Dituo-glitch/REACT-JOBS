// src/api/jobs.js
export const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/jobs';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch {
    throw new ApiError(
      'Could not reach the API. Is "npm run server" running?',
      0
    );
  }
  if (!res.ok) {
    throw new ApiError(`API error (${res.status})`, res.status);
  }
  return res.json();
}

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const getJobs = (limit) =>
  request(limit ? `${API_BASE}?_limit=${limit}` : API_BASE);

export const getJob = (id) => request(`${API_BASE}/${encodeURIComponent(id)}`);

export const createJob = (job) =>
  request(API_BASE, {
    method: 'POST',
    headers: JSON_HEADERS,
    body: JSON.stringify(job),
  });

export const updateJob = (id, job) =>
  request(`${API_BASE}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: JSON_HEADERS,
    body: JSON.stringify(job),
  });

export const deleteJob = (id) =>
  request(`${API_BASE}/${encodeURIComponent(id)}`, { method: 'DELETE' });

// React Router loaders
export const homeLoader = () => getJobs(3);
export const jobsLoader = () => getJobs();

export async function jobLoader({ params }) {
  try {
    return await getJob(params.id);
  } catch (error) {
    if (error.status === 404) {
      throw new Response('Not Found', { status: 404 });
    }
    throw error;
  }
}
