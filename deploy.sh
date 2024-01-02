#!/bin/bash

source .env

docker compose up -d

docker compose pause django-app

docker compose cp backup.pgdump database:backup.pgdump

echo "Drop the database and restore from backup"

docker compose exec database \
  pg_restore --clean --dbname $DB_NAME -U DB_USER backup.pgdump

echo "Done!"

docker compose unpause django-app
