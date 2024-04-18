"""Initial revision 2

Revision ID: 6b493c820443
Revises: 5d0293388b45
Create Date: 2024-04-18 04:59:02.598744

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '6b493c820443'
down_revision: Union[str, None] = '5d0293388b45'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tempuserindb',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('hashed_password', sa.LargeBinary(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('lastLoginAt', sa.DateTime(), nullable=False),
    sa.Column('is_disabled', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('userindb',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('hashed_password', sa.LargeBinary(), nullable=False),
    sa.Column('createdAt', sa.DateTime(), nullable=False),
    sa.Column('lastLoginAt', sa.DateTime(), nullable=False),
    sa.Column('is_disabled', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.drop_table('tempaccountindb')
    op.drop_table('accountindb')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('accountindb',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('hashed_password', postgresql.BYTEA(), autoincrement=False, nullable=False),
    sa.Column('createdAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('lastLoginAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('is_disabled', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='accountindb_pkey'),
    sa.UniqueConstraint('email', name='accountindb_email_key'),
    sa.UniqueConstraint('username', name='accountindb_username_key')
    )
    op.create_table('tempaccountindb',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('username', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('hashed_password', postgresql.BYTEA(), autoincrement=False, nullable=False),
    sa.Column('createdAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('lastLoginAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('is_disabled', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='tempaccountindb_pkey'),
    sa.UniqueConstraint('email', name='tempaccountindb_email_key'),
    sa.UniqueConstraint('username', name='tempaccountindb_username_key')
    )
    op.drop_table('userindb')
    op.drop_table('tempuserindb')
    # ### end Alembic commands ###