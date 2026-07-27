from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class LeadCreate(BaseModel):
    business_name: Optional[str] = None
    business_type: Optional[str] = None
    service_interest: Optional[str] = None
    budget_range: Optional[str] = None
    contact_name: Optional[str] = None
    contact_email: Optional[str] = None
    contact_phone: Optional[str] = None
    message: Optional[str] = None


class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class LeadPublic(BaseModel):
    id: int
    business_name: Optional[str]
    business_type: Optional[str]
    service_interest: Optional[str]
    budget_range: Optional[str]
    contact_name: Optional[str]
    contact_email: Optional[str]
    contact_phone: Optional[str]
    message: Optional[str]
    status: str
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CaseStudyCreate(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    published: bool = True


class CaseStudyUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    published: Optional[bool] = None


class CaseStudyPublic(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    published: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BlogPostCreate(BaseModel):
    title: str
    slug: str
    summary: str
    content: str
    published: bool = True


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    published: Optional[bool] = None


class BlogPostPublic(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    published: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TestimonialCreate(BaseModel):
    author_name: str
    author_business: Optional[str] = None
    quote: str
    published: bool = True


class TestimonialUpdate(BaseModel):
    author_name: Optional[str] = None
    author_business: Optional[str] = None
    quote: Optional[str] = None
    published: Optional[bool] = None


class TestimonialPublic(BaseModel):
    id: int
    author_name: str
    author_business: Optional[str]
    quote: str
    published: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PricingTierPublic(BaseModel):
    id: int
    name: str
    price: str
    description: str
    features: Optional[str] = None
    ideal_for: Optional[str] = None
    timeline: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class PricingTierCreate(BaseModel):
    name: str
    price: str
    description: str
    features: Optional[str] = None
    ideal_for: Optional[str] = None
    timeline: Optional[str] = None


class PricingTierUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[str] = None
    description: Optional[str] = None
    features: Optional[str] = None
    ideal_for: Optional[str] = None
    timeline: Optional[str] = None


class AuthLoginRequest(BaseModel):
    email: EmailStr
    password: str


class AuthLoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
