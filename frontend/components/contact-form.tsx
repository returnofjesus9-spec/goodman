'use client';

import { FormEvent, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('Thanks — your request has been received.');
        event.currentTarget.reset();
      } else {
        setStatus('We could not send the request right now. Please contact us directly.');
      }
    } catch {
      setStatus('We could not send the request right now. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <label className="block text-sm font-semibold text-slate-900">Business name</label>
      <input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" name="business_name" />
      <label className="mt-4 block text-sm font-semibold text-slate-900">Service interest</label>
      <input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" name="service_interest" />
      <label className="mt-4 block text-sm font-semibold text-slate-900">Budget range</label>
      <input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" name="budget_range" />
      <label className="mt-4 block text-sm font-semibold text-slate-900">Contact email</label>
      <input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" name="contact_email" />
      <label className="mt-4 block text-sm font-semibold text-slate-900">Message</label>
      <textarea className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2" name="message" rows={4} />
      <button disabled={isSubmitting} className="mt-6 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
        {isSubmitting ? 'Sending…' : 'Send request'}
      </button>
      {status ? <p className="mt-4 text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
