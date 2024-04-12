"""
Test can find forgotten downgrade methods, undeleted data types in downgrade
methods, typos and many other errors.

Does not require any maintenance - you just add it once to check 80% of typos
and mistakes in migrations forever.
"""

import pytest

from alembic.command import downgrade, upgrade
from alembic.config import Config
from alembic.script import Script, ScriptDirectory
from typing import List


def get_revisions():
    # Create Alembic configuration object
    # (we don't need database for getting revisions list)
    config = Config("alembic.ini")

    # Get directory object with Alembic migrations
    revisions_dir = ScriptDirectory.from_config(config)

    # Get & sort migrations, from first to last
    revisions = list(revisions_dir.walk_revisions("base", "heads"))
    revisions.reverse()
    return revisions


@pytest.mark.parametrize("revision", get_revisions())
def test_migrations_stairway(alembic_config: Config, revision: Script):
    upgrade(alembic_config, revision.revision)

    # Ensure revision.down_revision is of type str
    down_revision = revision.down_revision or "-1"
    if isinstance(down_revision, List):
        down_revision = down_revision[0]

    downgrade(alembic_config, str(down_revision))
    upgrade(alembic_config, revision.revision)

    pass
