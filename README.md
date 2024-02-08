# Coral Future App

The website is available at [coralfuture.org](https://coralfuture.org/), run by [Voolstra lab](https://biologie.uni-konstanz.de/voolstra). The motivation is to build a global database of standardized thermal tolerance ED50 values as determined by CBASS to enable meta-analyses and -comparisons. 

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

Populate the database (let's say my superuser is `iakovyu1`.

For complete datasets:

```commandline
sudo docker compose exec django-app python populate_db.py \
    --owner iakovyu1 \
    --csv_path static/datasheets/cbass_84.csv
```

For incomplete datasets, use `--no-pam` argument:

```commandline
sudo docker compose exec django-app python populate_db.py \
    --owner iakovyu1 \
    --csv_path static/datasheets/redsea_gradient_study.csv \
    --no-pam
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
