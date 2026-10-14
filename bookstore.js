// Step 2: switch database (use bookstore only works at the prompt)
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)

// Step 5: list every author and every book
db.authors.find()
db.books.find()

// Step 6: insert two new books
db.books.insertOne({
  title: "Unbroken",
  published_year: 2010,
  author_ids: ["author_004"]
})
db.books.insertOne({
  title: "Red Rising",
  published_year: 2014,
  author_ids: ["author_005"]
})

// Step 7: add the missing authors
db.authors.insertOne({
  _id: "author_004",
  name: "Laura Hillenbrand",
  nationality: "American",
  bio: { short: "Laura Hillenbrand is an acclaimed American author and journalist best known for her masterfully researched narrative non-fiction books.", long: "Laura Hillenbrand is an acclaimed American author and journalist who overcame profound physical adversity to write two of the most successful narrative non-fiction books of the 21st century. Born in Fairfax, Virginia in 1967, her life changed drastically in 1987 when a severe case of Chronic Fatigue Syndrome (ME/CFS) forced her to leave college and left her largely homebound. Turning to writing as a lifeline, she famously conducted extensive historical research from her room entirely via phone interviews and archives. Her efforts yielded the massive international bestsellers Seabiscuit: An American Legend (2001) and Unbroken (2010)" }
})
db.authors.insertOne({
  _id: "author_005",
  name: "Pierce Brown",
  nationality: "American",
  bio: { short: "Pierce Brown is an acclaimed American science fiction author best known for writing the bestselling Red Rising space opera series.", long: "Born in Denver, Colorado, Pierce Brown spent his youth moving across multiple states before graduating from Pepperdine University. After working a variety of odd jobs in politics and tech, he found global success with his 2014 debut novel, Red Rising. The dystopian sci-fi book quickly became a New York Times bestseller and expanded into a massive, multi-book space opera franchise. Today, his gripping storytelling is celebrated for its complex political intrigue, cinematic action, and deep mythological influences. He continues to captivate a dedicated global fanbase from his current home in Los Angeles, California." }
})

// Step 8: filter books by a list of authors (one original, one added)
db.books.find({ author_ids: { $in: ["author_001", "author_004"] } })