#!/command/with-contenv bash


# Convert one parameter to uppercase
to_uppercase() {
  echo $(echo $1 | tr '[:lower:]' '[:upper:]')
}

# Check if the parameter is string True/False and return it as success/failure
is_enabled() {
    if test "$(to_uppercase $1)" = "TRUE"; then
        return 0
    else
        if test "$(to_uppercase $1)" = "FALSE"; then
            return 1
        else
            echo "WARNING: init.sh interpreting \"$1\" as False" >/dev/stderr
            return 1
        fi    
    fi
}


cd "${BACKEND_ROOT:-/var/www/seismic/api}" || exit 1

echo "Running Django self-checks"
python3 manage.py check

# Run the database migrations
if is_enabled "${RUN_MIGRATION:-False}"; then
    echo "Migrating database"
    python3 manage.py migrate --run-syncdb
    python3 manage.py createcachetable
fi

# Compile the translation messages
if is_enabled ${RUN_COMPILE_MESSAGES:-False}; then
    echo "Compiling translation messages"
    python3 manage.py compilemessages
fi

# Collect the static files
if is_enabled ${RUN_COLLECT_STATIC:-False}; then
    echo "Collecting static files"
    mkdir static
    python3 manage.py collectstatic --noinput
fi

# Create the Django Admin super user
if is_enabled ${RUN_CREATE_SUPER_USER:-False}; then
    echo "Checking superuser presence"
    SUPERUSERS=$(python3 manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.filter(username=\"${DJANGO_ADMIN_EMAIL}\").count())")

    if test "${SUPERUSERS}" = "0"; then
        echo "Creating first superuser"
        python3 manage.py createsuperuser --noinput --username "${DJANGO_ADMIN_EMAIL}"

        echo "Setting superuser password"
        python3 manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); u = User.objects.get(username=\"${DJANGO_ADMIN_EMAIL}\"); u.set_password(\"${DJANGO_ADMIN_PASSWORD}\"); u.save()"
    else
        echo "A superuser already exists; nothing created"
    fi
fi

# Load the dummy data
if is_enabled ${RUN_LOAD_DUMMY_DATA:-False}; then
  echo "Loading dummy data into the database"
  ./manage.py loaddata proximal_utilities
  ./manage.py loaddata work_performed
fi

