# Django Pet Project

## Get Started

### Generate Django secrete jey

```python
from django.core.management.utils import get_random_secret_key

get_random_secret_key()
```

### Create `.env` file:

Here below an example `.env` file for development purposes:

```commandline
DEBUG=1 # Don't use 1 (True) in the production environment!
SECRET_KEY=''
DJANGO_ALLOWED_HOSTS='localhost 127.0.0.1 [::1]'
SQL_ENGINE=django.db.backends.postgresql_psycopg2
DB_USER=''
DB_PASSWORD=''
DB_NAME=''
CONTACT_EMAIL_ADDRESS=''
```

### Deploy

```commandline
bash deploy.sh
```

## Database Backups

Create a database backup:

```commandline
docker compose exec database pg_dump --format=custom > backup.pgdump
```

Restore a database backup:

```commandline
docker compose exec database \
    pg_restore --clean --dbname $DB_NAME -U $DB_USER backup.pgdump
```