# Goodman Consulting

Marketing site + admin panel for Goodman Consulting (Bhubaneswar). Next.js frontend, FastAPI backend, PostgreSQL.

## Stack

- **Frontend** — Next.js (App Router), Tailwind, Framer Motion → deployed on Cloudflare Pages
- **Backend** — FastAPI, SQLAlchemy, Alembic → deployed on Railway / Render / Fly.io
- **Database** — PostgreSQL

Frontend and backend are split because Cloudflare Pages/Workers has no practical hosting path for FastAPI + Postgres.

## Structure

```
frontend/   Next.js app — pages, components, styles
backend/    FastAPI app — routes, models, migrations
render.yaml Backend deploy config
```

## Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # set DATABASE_URL, JWT_SECRET, ALLOWED_ORIGINS
alembic upgrade head
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # set NEXT_PUBLIC_API_URL
npm run dev
```

## Admin panel

`/admin` — manages case studies, blog posts, pricing, and testimonials.

First run seeds one admin account from `ADMIN_INITIAL_EMAIL` / `ADMIN_INITIAL_PASSWORD` (backend env vars). Change the password after first login.

## Deploy

- **Frontend** → Cloudflare Pages, build from `frontend/`
- **Backend** → Railway / Render / Fly.io, with `DATABASE_URL` and `JWT_SECRET` set in the platform environment
- Run `alembic upgrade head` against the production database before first deploy
