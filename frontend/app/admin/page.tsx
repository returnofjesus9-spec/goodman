"use client";

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

type Lead = {
  id: number;
  contact_name?: string;
  contact_email?: string;
  service_interest?: string;
  status: string;
  notes?: string;
};

type CaseStudy = { id: number; title: string; slug: string; summary: string; content: string; published: boolean };

type BlogPost = { id: number; title: string; slug: string; summary: string; content: string; published: boolean };

type PricingTier = { id: number; name: string; price: string; description: string };

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('admin@goodmanconsulting.com');
  const [password, setPassword] = useState('admin');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [pricing, setPricing] = useState<PricingTier[]>([]);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const login = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setToken(data.access_token);
    loadAdminData(data.access_token);
  };

  const loadAdminData = async (authToken: string) => {
    const headers = { Authorization: `Bearer ${authToken}` };
    const [leadsRes, caseRes, blogRes, pricingRes] = await Promise.all([
      fetch(`${API_URL}/api/leads`, { headers }),
      fetch(`${API_URL}/api/case-studies`, { headers }),
      fetch(`${API_URL}/api/blog`, { headers }),
      fetch(`${API_URL}/api/pricing`, { headers }),
    ]);
    if (leadsRes.ok) setLeads(await leadsRes.json());
    if (caseRes.ok) setCaseStudies(await caseRes.json());
    if (blogRes.ok) setBlogPosts(await blogRes.json());
    if (pricingRes.ok) setPricing(await pricingRes.json());
  };

  useEffect(() => {
    if (token) {
      loadAdminData(token);
    }
  }, [token]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
      <h1 className="text-3xl font-semibold text-slate-900">Admin panel</h1>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        {!token ? (
          <div className="space-y-3">
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white" onClick={login}>Login</button>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Leads</h2>
              <div className="mt-4 space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="rounded-xl border border-slate-200 p-4 text-sm">
                    <p className="font-semibold">{lead.contact_name || lead.contact_email}</p>
                    <p>{lead.service_interest}</p>
                    <p className="text-slate-600">Status: {lead.status}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Case studies</h2>
              <div className="mt-4 space-y-3">
                {caseStudies.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 p-4 text-sm">
                    <p className="font-semibold">{item.title}</p>
                    <p>{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Blog posts</h2>
              <div className="mt-4 space-y-3">
                {blogPosts.map((item) => (
                  <div key={item.id} className="rounded-xl border border-slate-200 p-4 text-sm">
                    <p className="font-semibold">{item.title}</p>
                    <p>{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Pricing</h2>
              <div className="mt-4 space-y-3">
                {pricing.map((tier) => (
                  <div key={tier.id} className="rounded-xl border border-slate-200 p-4 text-sm">
                    <p className="font-semibold">{tier.name}</p>
                    <p>{tier.description}</p>
                    <p className="text-slate-600">{tier.price}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
