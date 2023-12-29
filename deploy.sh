docker compose up -d

docker compose pause django-app

echo "Drop the database and restore from backup"
docker compose exec database \
    psql -U postgres \
     -c "DROP SCHEMA public CASCADE; \
         CREATE SCHEMA public; \
         GRANT ALL ON SCHEMA public TO postgres; \
         GRANT ALL ON SCHEMA public TO public; \
         DROP DATABASE postgres;"

docker compose exec -T database psql \
    -U postgres -d postgres < pg_dump.sql
echo "Done!"

docker compose unpause django-app