# Goodman Consulting

## Architecture

This project uses a split deployment model because Cloudflare Pages/Workers does not provide a practical production hosting path for a FastAPI + PostgreSQL backend.

- Frontend: Next.js on Cloudflare Pages
- Backend: FastAPI on Railway, Render, or Fly.io
- Database: PostgreSQL

## Backend

### Setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

### Run locally

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Migrations

```bash
alembic upgrade head
```

## Frontend

### Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Deploy

- Deploy the frontend to Cloudflare Pages from the frontend folder.
- Deploy the backend to Railway, Render, or Fly.io and set the database URL and JWT secret in the platform environment.

## Admin panel

Use the admin login at /admin with the admin email and password you configured on the backend.

On first run, the backend seeds one admin account using the `ADMIN_INITIAL_EMAIL` and `ADMIN_INITIAL_PASSWORD` environment variables (set these to your own values before first deploy — there is no built-in default password). Change the password after first login if you ever used a temporary value.

Update case studies, blog posts, and pricing from the admin panel once the backend is running.
