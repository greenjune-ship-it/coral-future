# Django Pet Project

## Get Started

### Generate Django secrete jey

```python
from django.core.management.utils import get_random_secret_key

get_random_secret_key()
```

### Create `.env` file:

```commandline
DEBUG=''
SECRET_KEY=''
DJANGO_ALLOWED_HOSTS=''
DB_USER=''
DB_PASSWORD=''
DB_NAME=''
```