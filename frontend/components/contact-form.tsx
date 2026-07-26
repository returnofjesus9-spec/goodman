'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const inputClass =
  'mt-2 w-full rounded-sm border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';
const labelClass = 'block text-xs font-semibold uppercase tracking-[0.08em] text-ink-secondary';

// Render's free plan spins the backend down when idle, so the first request
// after a while can take 30-60s+ to wake it up. Without this, a fetch can
// time out (or the Cloudflare Worker running the frontend can give up on the
// upstream call) *after* the backend has already committed the lead to the
// database — so the visitor sees a failure even though the lead was saved.
function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const warmedUp = useRef(false);

  // Ping the backend as soon as the contact page loads, well before the
  // visitor finishes typing, so it's already awake by the time they submit.
  useEffect(() => {
    if (warmedUp.current) return;
    warmedUp.current = true;
    fetch(`${API_URL}/health`).catch(() => {});
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const body = JSON.stringify(payload);
    const requestInit: RequestInit = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body };

    // Try twice with generous timeouts before telling the visitor it failed.
    // A slow cold start on the first attempt is common; a genuine outage
    // will still fail both attempts.
    const attempts = [20000, 15000];
    let lastError: unknown = null;

    for (const timeoutMs of attempts) {
      try {
        const response = await fetchWithTimeout(`${API_URL}/api/leads`, requestInit, timeoutMs);

        if (response.ok) {
          setStatus('Thanks — your request has been received.');
          form.reset();
          setIsSubmitting(false);
          return;
        }

        if (response.status === 429) {
          setStatus('You have sent a few requests already — please wait a minute and try again, or message us on WhatsApp.');
          setIsSubmitting(false);
          return;
        }

        // A real server-side error (e.g. 5xx) — worth a retry.
        lastError = new Error(`Unexpected status ${response.status}`);
      } catch (error) {
        // Network error or timeout (likely the backend was still waking up) — retry.
        lastError = error;
      }
    }

    console.error('Contact form submission failed after retries:', lastError);
    setStatus(
      'Your request may have been received, but we could not confirm it — please also message us on WhatsApp so we do not miss you.'
    );
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-line bg-bg-surface p-8">
      <label className={labelClass}>Your name</label>
      <input className={inputClass} name="contact_name" />
      <label className={`mt-4 ${labelClass}`}>Business name</label>
      <input className={inputClass} name="business_name" />
      <label className={`mt-4 ${labelClass}`}>Business type</label>
      <input className={inputClass} name="business_type" placeholder="e.g. gym, boutique, clinic" />
      <label className={`mt-4 ${labelClass}`}>Service interest</label>
      <input className={inputClass} name="service_interest" />
      <label className={`mt-4 ${labelClass}`}>Budget range</label>
      <input className={inputClass} name="budget_range" />
      <label className={`mt-4 ${labelClass}`}>Contact email</label>
      <input className={inputClass} name="contact_email" type="email" />
      <label className={`mt-4 ${labelClass}`}>Phone / WhatsApp</label>
      <input className={inputClass} name="contact_phone" />
      <label className={`mt-4 ${labelClass}`}>Message</label>
      <textarea className={inputClass} name="message" rows={4} />
      <button
        disabled={isSubmitting}
        className="mt-6 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send request'}
      </button>
      {status ? <p className="mt-4 text-sm text-ink-secondary">{status}</p> : null}
    </form>
  );
}
