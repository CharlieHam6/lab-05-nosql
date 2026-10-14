
#!/usr/bin/env python3

import os
import logging
import pymongo

logging.basicConfig(level=logging.INFO)

MONGODB_ATLAS_URL = os.environ.get("MONGODB_ATLAS_URL")
MONGODB_ATLAS_USER = os.environ.get("MONGODB_ATLAS_USER")
MONGODB_ATLAS_PWD = os.environ.get("MONGODB_ATLAS_PWD")



def main():
    """Run the bookstore report."""
    client = None  

    try:
        
        client = pymongo.MongoClient(
            MONGODB_ATLAS_URL,
            username=MONGODB_ATLAS_USER,
            password=MONGODB_ATLAS_PWD,
        )

        
        client.admin.command("ping")
        logging.info("Connected to MongoDB")  

    except pymongo.errors.PyMongoError as err:
        
        logging.error("Not connected to Mongodb: %s", err)  # your error message

    finally:
        
        if client is not None:
            client.close()

if __name__ == "__main__":
    main()
