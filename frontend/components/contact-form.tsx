'use client';

import { FormEvent, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const inputClass =
  'mt-2 w-full rounded border border-stone-300 bg-white px-3 py-2 focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy';

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
    <form onSubmit={handleSubmit} className="rounded border border-stone-200 bg-white p-8">
      <label className="block text-sm font-semibold text-ink">Your name</label>
      <input className={inputClass} name="contact_name" />
      <label className="mt-4 block text-sm font-semibold text-ink">Business name</label>
      <input className={inputClass} name="business_name" />
      <label className="mt-4 block text-sm font-semibold text-ink">Business type</label>
      <input className={inputClass} name="business_type" placeholder="e.g. gym, boutique, clinic" />
      <label className="mt-4 block text-sm font-semibold text-ink">Service interest</label>
      <input className={inputClass} name="service_interest" />
      <label className="mt-4 block text-sm font-semibold text-ink">Budget range</label>
      <input className={inputClass} name="budget_range" />
      <label className="mt-4 block text-sm font-semibold text-ink">Contact email</label>
      <input className={inputClass} name="contact_email" type="email" />
      <label className="mt-4 block text-sm font-semibold text-ink">Phone / WhatsApp</label>
      <input className={inputClass} name="contact_phone" />
      <label className="mt-4 block text-sm font-semibold text-ink">Message</label>
      <textarea className={inputClass} name="message" rows={4} />
      <button disabled={isSubmitting} className="mt-6 rounded bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-navy-dark disabled:opacity-60">
        {isSubmitting ? 'Sending…' : 'Send request'}
      </button>
      {status ? <p className="mt-4 text-sm text-stone-600">{status}</p> : null}
    </form>
  );
}
