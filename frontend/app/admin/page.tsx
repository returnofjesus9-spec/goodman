'use client';

import { FormEvent, useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const LEAD_STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost'];

type Lead = {
  id: number;
  business_name?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  service_interest?: string;
  status: string;
  notes?: string;
};

type CaseStudy = { id: number; title: string; slug: string; summary: string; content: string; published: boolean };
type BlogPost = { id: number; title: string; slug: string; summary: string; content: string; published: boolean };
type PricingTier = { id: number; name: string; price: string; description: string };

const emptyDoc = { title: '', slug: '', summary: '', content: '', published: true };

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [leads, setLeads] = useState<Lead[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [pricing, setPricing] = useState<PricingTier[]>([]);

  const [caseForm, setCaseForm] = useState(emptyDoc);
  const [editingCaseSlug, setEditingCaseSlug] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState(emptyDoc);
  const [editingBlogSlug, setEditingBlogSlug] = useState<string | null>(null);
  const [pricingDrafts, setPricingDrafts] = useState<Record<number, PricingTier>>({});

  const authHeaders = (extra: Record<string, string> = {}) => ({
    Authorization: `Bearer ${token}`,
    ...extra,
  });

  async function login() {
    setLoginError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setLoginError('Invalid email or password.');
        return;
      }
      const data = await res.json();
      setToken(data.access_token);
    } catch {
      setLoginError('Could not reach the server. Check your connection and try again.');
    }
  }

  async function loadAdminData(authToken: string) {
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
    if (pricingRes.ok) {
      const items: PricingTier[] = await pricingRes.json();
      setPricing(items);
      setPricingDrafts(Object.fromEntries(items.map((item) => [item.id, item])));
    }
  }

  useEffect(() => {
    if (token) loadAdminData(token);
  }, [token]);

  // --- Leads ---
  async function updateLeadStatus(id: number, status: string) {
    const res = await fetch(`${API_URL}/api/leads/${id}`, {
      method: 'PATCH',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ status }),
    });
    if (res.ok) setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  async function saveLeadNotes(id: number, notes: string) {
    const res = await fetch(`${API_URL}/api/leads/${id}`, {
      method: 'PATCH',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ notes }),
    });
    if (res.ok) setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
  }

  // --- Case studies ---
  async function submitCaseStudy(e: FormEvent) {
    e.preventDefault();
    const isEditing = Boolean(editingCaseSlug);
    const res = await fetch(
      isEditing ? `${API_URL}/api/case-studies/${editingCaseSlug}` : `${API_URL}/api/case-studies`,
      {
        method: isEditing ? 'PUT' : 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(caseForm),
      }
    );
    if (res.ok) {
      setCaseForm(emptyDoc);
      setEditingCaseSlug(null);
      loadAdminData(token);
    }
  }

  function editCaseStudy(item: CaseStudy) {
    setCaseForm(item);
    setEditingCaseSlug(item.slug);
  }

  async function deleteCaseStudy(slug: string) {
    const res = await fetch(`${API_URL}/api/case-studies/${slug}`, { method: 'DELETE', headers: authHeaders() });
    if (res.ok) setCaseStudies((prev) => prev.filter((c) => c.slug !== slug));
  }

  async function toggleCaseStudyPublished(item: CaseStudy) {
    const res = await fetch(`${API_URL}/api/case-studies/${item.slug}`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ published: !item.published }),
    });
    if (res.ok) loadAdminData(token);
  }

  // --- Blog posts ---
  async function submitBlogPost(e: FormEvent) {
    e.preventDefault();
    const isEditing = Boolean(editingBlogSlug);
    const res = await fetch(isEditing ? `${API_URL}/api/blog/${editingBlogSlug}` : `${API_URL}/api/blog`, {
      method: isEditing ? 'PUT' : 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(blogForm),
    });
    if (res.ok) {
      setBlogForm(emptyDoc);
      setEditingBlogSlug(null);
      loadAdminData(token);
    }
  }

  function editBlogPost(item: BlogPost) {
    setBlogForm(item);
    setEditingBlogSlug(item.slug);
  }

  async function deleteBlogPost(slug: string) {
    const res = await fetch(`${API_URL}/api/blog/${slug}`, { method: 'DELETE', headers: authHeaders() });
    if (res.ok) setBlogPosts((prev) => prev.filter((b) => b.slug !== slug));
  }

  async function toggleBlogPublished(item: BlogPost) {
    const res = await fetch(`${API_URL}/api/blog/${item.slug}`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ published: !item.published }),
    });
    if (res.ok) loadAdminData(token);
  }

  // --- Pricing ---
  async function savePricingTier(id: number) {
    const draft = pricingDrafts[id];
    const res = await fetch(`${API_URL}/api/pricing/${id}`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ name: draft.name, price: draft.price, description: draft.description }),
    });
    if (res.ok) setPricing((prev) => prev.map((p) => (p.id === id ? draft : p)));
  }

  const inputClass =
    'w-full rounded-sm border border-stone-300 px-3 py-2 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-gold';

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-8 lg:px-12">
      <h1 className="text-3xl font-semibold text-ink">Admin panel</h1>

      {!token ? (
        <div className="mt-8 max-w-sm rounded-lg border border-stone-200 bg-white p-6 space-y-3">
          <input className={inputClass} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input
            className={inputClass}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="rounded-sm bg-ink px-5 py-3 text-sm font-semibold text-white" onClick={login}>
            Login
          </button>
          {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
        </div>
      ) : (
        <div className="mt-8 space-y-12">
          {/* Leads */}
          <section>
            <h2 className="text-xl font-semibold text-ink">Leads</h2>
            <div className="mt-4 space-y-3">
              {leads.length ? (
                leads.map((lead) => (
                  <div key={lead.id} className="rounded-sm border border-stone-200 p-4 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">
                        {lead.business_name || lead.contact_name || lead.contact_email || `Lead #${lead.id}`}
                      </p>
                      <select
                        className="rounded-sm border border-stone-300 px-2 py-1 text-xs"
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      >
                        {LEAD_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="mt-1 text-stone-600">{lead.service_interest}</p>
                    <p className="mt-1 text-stone-600">
                      {lead.contact_email} {lead.contact_phone ? `· ${lead.contact_phone}` : ''}
                    </p>
                    <textarea
                      className={`${inputClass} mt-2`}
                      placeholder="Notes"
                      defaultValue={lead.notes || ''}
                      rows={2}
                      onBlur={(e) => saveLeadNotes(lead.id, e.target.value)}
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-stone-600">No leads yet.</p>
              )}
            </div>
          </section>

          {/* Case studies */}
          <section>
            <h2 className="text-xl font-semibold text-ink">Case studies</h2>
            <form onSubmit={submitCaseStudy} className="mt-4 space-y-2 rounded-sm border border-stone-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {editingCaseSlug ? `Editing: ${editingCaseSlug}` : 'New case study'}
              </p>
              <input
                className={inputClass}
                placeholder="Title"
                value={caseForm.title}
                onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                required
              />
              <input
                className={inputClass}
                placeholder="Slug (e.g. retail-dashboard)"
                value={caseForm.slug}
                onChange={(e) => setCaseForm({ ...caseForm, slug: e.target.value })}
                required
                disabled={Boolean(editingCaseSlug)}
              />
              <input
                className={inputClass}
                placeholder="Summary"
                value={caseForm.summary}
                onChange={(e) => setCaseForm({ ...caseForm, summary: e.target.value })}
                required
              />
              <textarea
                className={inputClass}
                placeholder="Full content"
                rows={4}
                value={caseForm.content}
                onChange={(e) => setCaseForm({ ...caseForm, content: e.target.value })}
                required
              />
              <div className="flex items-center gap-3">
                <button className="rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-white" type="submit">
                  {editingCaseSlug ? 'Save changes' : 'Create case study'}
                </button>
                {editingCaseSlug ? (
                  <button
                    type="button"
                    className="text-sm text-stone-600 underline"
                    onClick={() => {
                      setCaseForm(emptyDoc);
                      setEditingCaseSlug(null);
                    }}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>

            <div className="mt-4 space-y-3">
              {caseStudies.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-sm border border-stone-200 p-4 text-sm">
                  <div>
                    <p className="font-semibold">
                      {item.title} {item.published ? '' : <span className="text-stone-400">(draft)</span>}
                    </p>
                    <p className="text-stone-600">{item.summary}</p>
                  </div>
                  <div className="flex shrink-0 gap-3">
                    <button className="text-xs font-semibold text-stone-600 underline" onClick={() => editCaseStudy(item)}>
                      Edit
                    </button>
                    <button
                      className="text-xs font-semibold text-stone-600 underline"
                      onClick={() => toggleCaseStudyPublished(item)}
                    >
                      {item.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="text-xs font-semibold text-red-600 underline" onClick={() => deleteCaseStudy(item.slug)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Blog posts */}
          <section>
            <h2 className="text-xl font-semibold text-ink">Blog posts</h2>
            <form onSubmit={submitBlogPost} className="mt-4 space-y-2 rounded-sm border border-stone-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {editingBlogSlug ? `Editing: ${editingBlogSlug}` : 'New blog post'}
              </p>
              <input
                className={inputClass}
                placeholder="Title"
                value={blogForm.title}
                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                required
              />
              <input
                className={inputClass}
                placeholder="Slug (e.g. website-cost-guide)"
                value={blogForm.slug}
                onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                required
                disabled={Boolean(editingBlogSlug)}
              />
              <input
                className={inputClass}
                placeholder="Summary"
                value={blogForm.summary}
                onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                required
              />
              <textarea
                className={inputClass}
                placeholder="Full content"
                rows={4}
                value={blogForm.content}
                onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                required
              />
              <div className="flex items-center gap-3">
                <button className="rounded-sm bg-ink px-4 py-2 text-sm font-semibold text-white" type="submit">
                  {editingBlogSlug ? 'Save changes' : 'Create post'}
                </button>
                {editingBlogSlug ? (
                  <button
                    type="button"
                    className="text-sm text-stone-600 underline"
                    onClick={() => {
                      setBlogForm(emptyDoc);
                      setEditingBlogSlug(null);
                    }}
                  >
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>

            <div className="mt-4 space-y-3">
              {blogPosts.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-sm border border-stone-200 p-4 text-sm">
                  <div>
                    <p className="font-semibold">
                      {item.title} {item.published ? '' : <span className="text-stone-400">(draft)</span>}
                    </p>
                    <p className="text-stone-600">{item.summary}</p>
                  </div>
                  <div className="flex shrink-0 gap-3">
                    <button className="text-xs font-semibold text-stone-600 underline" onClick={() => editBlogPost(item)}>
                      Edit
                    </button>
                    <button className="text-xs font-semibold text-stone-600 underline" onClick={() => toggleBlogPublished(item)}>
                      {item.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="text-xs font-semibold text-red-600 underline" onClick={() => deleteBlogPost(item.slug)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-xl font-semibold text-ink">Pricing</h2>
            <div className="mt-4 space-y-3">
              {pricing.map((tier) => {
                const draft = pricingDrafts[tier.id] || tier;
                return (
                  <div key={tier.id} className="rounded-sm border border-stone-200 p-4 text-sm space-y-2">
                    <input
                      className={inputClass}
                      value={draft.name}
                      onChange={(e) => setPricingDrafts({ ...pricingDrafts, [tier.id]: { ...draft, name: e.target.value } })}
                    />
                    <input
                      className={inputClass}
                      value={draft.price}
                      onChange={(e) => setPricingDrafts({ ...pricingDrafts, [tier.id]: { ...draft, price: e.target.value } })}
                    />
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={draft.description}
                      onChange={(e) =>
                        setPricingDrafts({ ...pricingDrafts, [tier.id]: { ...draft, description: e.target.value } })
                      }
                    />
                    <button
                      className="rounded-sm bg-ink px-4 py-2 text-xs font-semibold text-white"
                      onClick={() => savePricingTier(tier.id)}
                    >
                      Save
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
