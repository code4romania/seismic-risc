#!/command/with-contenv bash

# Convert one parameter to uppercase
to_uppercase() {
    echo "${1}" | tr '[:lower:]' '[:upper:]'
}

# Check if the parameter is string True/False and return it as success/failure
is_enabled() {
    _UPPER_VALUE=$(to_uppercase "$1")
    if [ "${_UPPER_VALUE}" = "TRUE" ]; then
        return 0
    elif [ "${_UPPER_VALUE}" = "FALSE" ]; then
        return 1
    else
        echo "WARNING: init.sh interpreting \"$1\" as False" >/dev/stderr
        return 1
    fi
}

cd "${BACKEND_ROOT:-/var/www/seismic/backend}" || exit 1

echo "Running Django self-checks"
python3 manage.py check

# Run the database migrations
if is_enabled "${RUN_MIGRATIONS:-False}"; then
    echo "Migrating database"
    python3 manage.py migrate --run-syncdb
    python3 manage.py createcachetable
fi

# Compile the translation messages
if is_enabled "${RUN_COMPILE_MESSAGES:-False}"; then
    echo "Compiling translation messages"
    python3 manage.py compilemessages
fi

# Collect the static files
if is_enabled "${RUN_COLLECT_STATIC:-False}"; then
    echo "Collecting static files"
    mkdir static
    python3 manage.py collectstatic --noinput
fi

# Create the Django Admin super user
if is_enabled "${RUN_CREATE_SUPER_USER:-False}"; then
    echo "Running the superuser seed script"

    python3 manage.py seed_superuser \
        --first_name "${DJANGO_ADMIN_FIRST_NAME}" \
        --last_name "${DJANGO_ADMIN_LAST_NAME}"
fi

# Load the dummy data
if is_enabled "${RUN_LOAD_INITIAL_DATA:-False}"; then
    echo "Loading initial building data into the database"

    ./manage.py loaddata proximal_utilities
    ./manage.py loaddata work_performed
fi
