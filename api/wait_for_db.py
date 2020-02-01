#!/usr/bin/env python3
"""
This utility script checks if the PostgreSQL database is ready for use.
"""
import logging
import sys
from time import sleep, time

import dj_database_url
import psycopg2

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())


if __name__ == "__main__":
    db_config = dj_database_url.config()

    config = {
        "dbname": db_config["NAME"],
        "user": db_config["USER"],
        "password": db_config["PASSWORD"],
        "host": db_config["HOST"],
        "port": db_config["PORT"],
    }

    start_time = time()
    timeout = 30
    while time() - start_time < timeout:
        try:
            conn = psycopg2.connect(**config)
            logger.info("DB ready! 🎉")
            conn.close()
            sys.exit()
        except psycopg2.OperationalError:
            logger.info(f"DB not ready. Waiting for 1 second ...")
            sleep(1)

    logger.error(f"Could not connect to DB within {timeout} seconds.")
