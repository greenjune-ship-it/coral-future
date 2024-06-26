#!/bin/bash

docker compose up -d

docker compose exec django-app python manage.py create_users user_data.json

docker compose exec django-app python manage.py populate_db --owner voolsch1 --csv_path static/datasheets/cbass_84.csv
docker compose exec django-app python manage.py populate_db --owner voolsch1 --csv_path static/datasheets/redsea_gradient_study.csv --no-pam
docker compose exec django-app python manage.py populate_db --owner voolsch1 --csv_path static/datasheets/2022_Fiji_Jareis.csv

docker compose exec django-app python manage.py link_biosamples

docker compose exec django-app python manage.py assign_mmm
