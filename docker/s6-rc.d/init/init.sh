#!/command/with-contenv bash

cd "${BACKEND_ROOT:-/var/www/seismic/api}" || exit 1

echo "Checking..."
python3 manage.py check

if [ "${RUN_MIGRATION^^}" = "TRUE" ]; then
    echo "Migrating database"
    python3 manage.py migrate --run-syncdb
    python3 manage.py createcachetable
fi

if [ "${RUN_COMPILE_MESSAGES^^}" = "TRUE" ]; then
    echo "Compiling translation messages"
    python3 manage.py compilemessages
fi

if [ "${RUN_COLLECT_STATIC^^}" = "TRUE" ]; then
    echo "Collect static"
    mkdir static
    python3 manage.py collectstatic --noinput
fi

if [ "${RUN_CREATE_SUPER_USER^^}" = "TRUE" ]; then
    echo "Check superuser presence"
    SUPERUSERS=$(python3 manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.filter(username=\"${DJANGO_ADMIN_EMAIL}\").count())")

    if [ "${SUPERUSERS}" = "0" ]; then
        echo "Create first superuser"
        python3 manage.py createsuperuser --noinput --username "${DJANGO_ADMIN_EMAIL}"

        echo "Set superuser password"
        python3 manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); u = User.objects.get(username=\"${DJANGO_ADMIN_EMAIL}\"); u.set_password(\"${DJANGO_ADMIN_PASSWORD}\"); u.save()"
    else
        echo "A superuser already exists"
    fi
fi

if [ "${RUN_LOAD_DUMMY_DATA^^}" = "TRUE" ] ; then
  echo "Load dummy data into the database"
  ./manage.py loaddata proximal_utilities
  ./manage.py loaddata work_performed
fi

