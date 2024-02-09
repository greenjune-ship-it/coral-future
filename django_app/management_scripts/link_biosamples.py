import logging
import os

import django

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django_app.settings')
django.setup()

# Import your models after setting up Django
from users.models import CustomUser

# Configure the logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s')

AF = [
    "AF1-30", "AF1-33", "AF1-36", "AF1-39",
    "AF2-30", "AF2-33", "AF2-36", "AF2-39",
    "AF3-30", "AF3-33", "AF3-36", "AF3-39",
    "AF4-30", "AF4-33", "AF4-36", "AF4-39",
    "AF5-30", "AF5-33", "AF5-36", "AF5-39",
    "AF6-30", "AF6-33", "AF6-36", "AF6-39",
    "AF7-30", "AF7-33", "AF7-36", "AF7-39"
]

ICN = [
    "ICN1-30", "ICN1-33", "ICN1-36", "ICN1-39",
    "ICN2-30", "ICN2-33", "ICN2-36", "ICN2-39",
    "ICN3-30", "ICN3-33", "ICN3-36", "ICN3-39",
    "ICN4-30", "ICN4-33", "ICN4-36", "ICN4-39",
    "ICN5-30", "ICN5-33", "ICN5-36", "ICN5-39",
    "ICN6-30", "ICN6-33", "ICN6-36", "ICN6-39",
    "ICN7-30", "ICN7-33", "ICN7-36", "ICN7-39"
]


def main():
    pass


if __name__ == "__main__":
    main()
