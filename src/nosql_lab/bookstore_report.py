
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

        db = client["bookstore"]
        authors = db["authors"]
        books = db["books"]

        author_ids = ["author_001", "author_004"]

        count = authors.count_documents({"_id": {"$in": author_ids}})
        print(f"Authors: {count}")
        print()

        for author_id in author_ids:
            author = authors.find_one({"_id": author_id})
            print(author["name"])

            author_books = books.find({"author_ids": author_id})

            for book in author_books:
                print(f"  {book['title']} ({book['published_year']})")

            print()

    except pymongo.errors.PyMongoError as err:
        logging.error("Not connected to MongoDB: %s", err)

    finally:
        if client is not None:
            client.close()


if __name__ == "__main__":
    main()