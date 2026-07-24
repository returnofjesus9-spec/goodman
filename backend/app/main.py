import os
from datetime import datetime, timedelta
from typing import Annotated

import bcrypt
import jwt
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, Header, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.models import Base, Lead, LeadStatus, BlogPost, CaseStudy, PricingTier, User
from app.schemas import (
    AuthLoginRequest,
    AuthLoginResponse,
    BlogPostCreate,
    BlogPostPublic,
    BlogPostUpdate,
    CaseStudyCreate,
    CaseStudyPublic,
    CaseStudyUpdate,
    LeadCreate,
    LeadPublic,
    LeadUpdate,
    PricingTierPublic,
    PricingTierUpdate,
)

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./goodman.db")
# Neon/Render sometimes provide "postgres://"; SQLAlchemy 2.x requires "postgresql://"
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

JWT_SECRET = os.getenv("JWT_SECRET", "change-me")
API_HOST = os.getenv("API_HOST", "0.0.0.0")
API_PORT = int(os.getenv("PORT", os.getenv("API_PORT", "8000")))
RATE_LIMIT_REQUESTS = int(os.getenv("RATE_LIMIT_REQUESTS", "5"))
RATE_LIMIT_WINDOW_SECONDS = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "60"))
ALLOWED_ORIGINS = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")]

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    # Neon requires SSL
    engine = create_engine(DATABASE_URL, connect_args={"sslmode": "require"}, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI(title="Goodman Consulting API")


def initialize_database() -> None:
    Base.metadata.create_all(bind=engine)
    seed_initial_data()


app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Password hashing helpers

def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


# Dependency

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Simple JWT auth helper

def get_current_admin(authorization: Annotated[str | None, Header()] = None, db: Session = Depends(get_db)) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    token = authorization.split(" ", 1)[1]
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except jwt.InvalidTokenError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc

    user = db.query(User).filter(User.email == payload.get("sub")).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")
    return user


# Seed data

def seed_initial_data() -> None:
    db = SessionLocal()
    try:
        admin_email = os.getenv("ADMIN_INITIAL_EMAIL")
        admin_password = os.getenv("ADMIN_INITIAL_PASSWORD")
        if admin_email and admin_password and not db.query(User).filter(User.email == admin_email).first():
            admin = User(email=admin_email, password_hash=hash_password(admin_password))
            db.add(admin)

        if not db.query(CaseStudy).filter(CaseStudy.slug == "retail-analytics-dashboard").first():
            db.add(
                CaseStudy(
                    title="Retail analytics dashboard",
                    slug="retail-analytics-dashboard",
                    summary="A simple dashboard that helped a retail business see daily sales and stock gaps.",
                    content="[PLACEHOLDER: Full case study content goes here.]",
                    published=True,
                )
            )

        if not db.query(BlogPost).filter(BlogPost.slug == "how-much-should-a-small-business-website-cost").first():
            db.add(
                BlogPost(
                    title="How much should a small business website cost in India?",
                    slug="how-much-should-a-small-business-website-cost",
                    summary="A practical guide to budgeting for a simple but useful website.",
                    content="[PLACEHOLDER: Full blog post content goes here.]",
                    published=True,
                )
            )

        if not db.query(PricingTier).filter(PricingTier.name == "Starter").first():
            db.add_all(
                [
                    PricingTier(name="Starter", price="₹25,000", description="A simple brochure site with 5 pages and WhatsApp contact."),
                    PricingTier(name="Growth", price="₹60,000", description="A polished business website with automation and lead capture."),
                    PricingTier(name="Scale", price="₹1,20,000", description="Custom dashboards, workflows, and deeper integrations."),
                ]
            )

        db.commit()
    finally:
        db.close()


@app.on_event("startup")
def startup_event() -> None:
    initialize_database()


initialize_database()


# Public endpoints
@app.get("/health")
@app.head("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}




@app.post("/api/leads", status_code=status.HTTP_201_CREATED)
def create_lead(payload: LeadCreate, request: Request, db: Session = Depends(get_db)) -> LeadPublic:
    client_ip = request.client.host if request.client else "unknown"
    recent_leads = (
        db.query(Lead)
        .filter(Lead.ip_address == client_ip)
        .filter(Lead.created_at >= datetime.utcnow() - timedelta(seconds=RATE_LIMIT_WINDOW_SECONDS))
        .count()
    )
    if recent_leads >= RATE_LIMIT_REQUESTS:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many requests")

    lead = Lead(
        business_name=payload.business_name,
        business_type=payload.business_type,
        service_interest=payload.service_interest,
        budget_range=payload.budget_range,
        contact_name=payload.contact_name,
        contact_email=payload.contact_email,
        contact_phone=payload.contact_phone,
        message=payload.message,
        ip_address=client_ip,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return LeadPublic.model_validate(lead)


@app.get("/api/case-studies", response_model=list[CaseStudyPublic])
def list_case_studies(db: Session = Depends(get_db)) -> list[CaseStudyPublic]:
    items = db.query(CaseStudy).filter(CaseStudy.published.is_(True)).order_by(CaseStudy.created_at.desc()).all()
    return [CaseStudyPublic.model_validate(item) for item in items]


@app.get("/api/case-studies/{slug}", response_model=CaseStudyPublic)
def get_case_study(slug: str, db: Session = Depends(get_db)) -> CaseStudyPublic:
    item = db.query(CaseStudy).filter(CaseStudy.slug == slug).first()
    if not item or not item.published:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case study not found")
    return CaseStudyPublic.model_validate(item)


@app.get("/api/blog", response_model=list[BlogPostPublic])
def list_blog_posts(db: Session = Depends(get_db)) -> list[BlogPostPublic]:
    items = db.query(BlogPost).filter(BlogPost.published.is_(True)).order_by(BlogPost.created_at.desc()).all()
    return [BlogPostPublic.model_validate(item) for item in items]


@app.get("/api/blog/{slug}", response_model=BlogPostPublic)
def get_blog_post(slug: str, db: Session = Depends(get_db)) -> BlogPostPublic:
    item = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not item or not item.published:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found")
    return BlogPostPublic.model_validate(item)


@app.get("/api/pricing", response_model=list[PricingTierPublic])
def list_pricing(db: Session = Depends(get_db)) -> list[PricingTierPublic]:
    items = db.query(PricingTier).order_by(PricingTier.id.asc()).all()
    return [PricingTierPublic.model_validate(item) for item in items]


# Admin endpoints
@app.post("/api/auth/login", response_model=AuthLoginResponse)
def login(payload: AuthLoginRequest, db: Session = Depends(get_db)) -> AuthLoginResponse:
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    expires_at = datetime.utcnow() + timedelta(hours=8)
    token = jwt.encode({"sub": user.email, "exp": expires_at}, JWT_SECRET, algorithm="HS256")
    return AuthLoginResponse(access_token=token, token_type="bearer")


@app.get("/api/leads", response_model=list[LeadPublic])
def list_leads(db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> list[LeadPublic]:
    items = db.query(Lead).order_by(Lead.created_at.desc()).all()
    return [LeadPublic.model_validate(item) for item in items]


@app.patch("/api/leads/{lead_id}", response_model=LeadPublic)
def update_lead(lead_id: int, payload: LeadUpdate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> LeadPublic:
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(lead, field, value)

    db.commit()
    db.refresh(lead)
    return LeadPublic.model_validate(lead)


@app.post("/api/case-studies", response_model=CaseStudyPublic)
def create_case_study(payload: CaseStudyCreate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> CaseStudyPublic:
    item = CaseStudy(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return CaseStudyPublic.model_validate(item)


@app.put("/api/case-studies/{slug}", response_model=CaseStudyPublic)
def update_case_study(slug: str, payload: CaseStudyUpdate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> CaseStudyPublic:
    item = db.query(CaseStudy).filter(CaseStudy.slug == slug).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case study not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return CaseStudyPublic.model_validate(item)


@app.delete("/api/case-studies/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_case_study(slug: str, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> None:
    item = db.query(CaseStudy).filter(CaseStudy.slug == slug).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case study not found")
    db.delete(item)
    db.commit()


@app.post("/api/blog", response_model=BlogPostPublic)
def create_blog_post(payload: BlogPostCreate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> BlogPostPublic:
    item = BlogPost(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return BlogPostPublic.model_validate(item)


@app.put("/api/blog/{slug}", response_model=BlogPostPublic)
def update_blog_post(slug: str, payload: BlogPostUpdate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> BlogPostPublic:
    item = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Case study not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return BlogPostPublic.model_validate(item)


@app.delete("/api/blog/{slug}", status_code=status.HTTP_204_NO_CONTENT)
def delete_blog_post(slug: str, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> None:
    item = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found")
    db.delete(item)
    db.commit()


@app.put("/api/pricing/{tier_id}", response_model=PricingTierPublic)
def update_pricing_tier(tier_id: int, payload: PricingTierUpdate, db: Session = Depends(get_db), admin: User = Depends(get_current_admin)) -> PricingTierPublic:
    item = db.query(PricingTier).filter(PricingTier.id == tier_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pricing tier not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return PricingTierPublic.model_validate(item)
