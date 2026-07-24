from alembic import op
import sqlalchemy as sa


revision = "001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(op.f("ix_users_id"), "users", ["id"], unique=False)

    op.create_table(
        "leads",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("business_name", sa.String(length=255), nullable=True),
        sa.Column("business_type", sa.String(length=255), nullable=True),
        sa.Column("service_interest", sa.String(length=255), nullable=True),
        sa.Column("budget_range", sa.String(length=255), nullable=True),
        sa.Column("contact_name", sa.String(length=255), nullable=True),
        sa.Column("contact_email", sa.String(length=255), nullable=True),
        sa.Column("contact_phone", sa.String(length=255), nullable=True),
        sa.Column("message", sa.Text(), nullable=True),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("ip_address", sa.String(length=100), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_leads_id"), "leads", ["id"], unique=False)

    op.create_table(
        "case_studies",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("slug", sa.String(length=255), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("published", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_case_studies_id"), "case_studies", ["id"], unique=False)
    op.create_index(op.f("ix_case_studies_slug"), "case_studies", ["slug"], unique=True)

    op.create_table(
        "blog_posts",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("slug", sa.String(length=255), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("published", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_blog_posts_id"), "blog_posts", ["id"], unique=False)
    op.create_index(op.f("ix_blog_posts_slug"), "blog_posts", ["slug"], unique=True)

    op.create_table(
        "pricing_tiers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("price", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_pricing_tiers_id"), "pricing_tiers", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_pricing_tiers_id"), table_name="pricing_tiers")
    op.drop_table("pricing_tiers")
    op.drop_index(op.f("ix_blog_posts_slug"), table_name="blog_posts")
    op.drop_index(op.f("ix_blog_posts_id"), table_name="blog_posts")
    op.drop_table("blog_posts")
    op.drop_index(op.f("ix_case_studies_slug"), table_name="case_studies")
    op.drop_index(op.f("ix_case_studies_id"), table_name="case_studies")
    op.drop_table("case_studies")
    op.drop_index(op.f("ix_leads_id"), table_name="leads")
    op.drop_table("leads")
    op.drop_index(op.f("ix_users_id"), table_name="users")
    op.drop_index(op.f("ix_users_email"), table_name="users")
    op.drop_table("users")
