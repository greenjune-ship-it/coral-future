# Coral Future App

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
DJANGO_SETTINGS_MODULE=django_app.settings
SQL_ENGINE=django.db.backends.postgresql_psycopg2
REACT_APP_BACKEND_URL=http://localhost # Don't forget to change this
DB_USER=''
DB_PASSWORD=''
DB_NAME=''
CONTACT_EMAIL_ADDRESS=''
```

### Deploy

From backup:

```commandline
bash deploy.sh
```

Up the project from scratch:

```commandline
sudo docker compose up -d

```

Collect static files:

```commandline
sudo docker compose exec django-app python manage.py collectstatic --noinput
```

Create superuser:

```commandline
sudo docker compose exec django-app python manage.py createsuperuser
```

Populate the database (let's say my superuser is `adm_iakovyu1`:

```commandline
sudo docker compose exec django-app python populate_db.py \
    --owner adm_iakovyu1 \
    --csv_path static/datasheets/example.csv
```

## Database Backups

Create a database backup:

```commandline
sudo docker compose exec database pg_dump -U $DB_USER --format=custom > backup.pgdump
```

Restore a database backup:

```commandline
# Copy backup file first
sudo docker cp backup.pgdump coral-future-database-1:/tmp
# Enter container
sudo docker compose exec database bash
cd /tmp
# Restore
pg_restore --clean --dbname $DB_NAME -U $DB_USER backup.pgdump
```
