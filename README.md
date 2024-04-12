# Fitness APp



## Features







## Usage

PGAdmin:

To connect PGAdmin to the Postgres Container, head to localhost and the specified pg admin host.

Next, press on "Add new AServer" and go to "connections".
UNder the host, type in the name of the postgres container in the compose file:"fitness-app-postgres-dev"
Use the POSTGRES_USERNAME and POSTGRES_PASSWORD to connect to the database




Reset docker:
docker stop $(docker ps -aq) && docker rm -f $(docker ps -aq) && docker rmi -f $(docker images -aq) && docker system prune -af --volumes  


## Migrations
You can run:
alembic revision --autogenerate -m "Initial revision"
alembic upgrade head



Resources: https://github.com/ThomasAitken/demo-fastapi-async-sqlalchemy/blob/main/backend/app/conftest.py

https://github.com/ThomasAitken/demo-fastapi-async-sqlalchemy/blob/main/backend/app/conftest.py
https://github.com/rhoboro/async-fastapi-sqlalchemy/blob/main/migrations/env.py
https://github.com/gpkc/fastapi-sqlalchemy-pytest/blob/main/alembic/env.py



## Use SMTP
go to google.com/apppasswords and set a new password for ur account that u use as env var