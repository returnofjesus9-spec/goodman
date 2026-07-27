from alembic import op
import sqlalchemy as sa


revision = "003_pricing_extra_fields"
down_revision = "002_testimonials"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("pricing_tiers", sa.Column("features", sa.Text(), nullable=True))
    op.add_column("pricing_tiers", sa.Column("ideal_for", sa.String(length=255), nullable=True))
    op.add_column("pricing_tiers", sa.Column("timeline", sa.String(length=100), nullable=True))


def downgrade() -> None:
    op.drop_column("pricing_tiers", "timeline")
    op.drop_column("pricing_tiers", "ideal_for")
    op.drop_column("pricing_tiers", "features")
