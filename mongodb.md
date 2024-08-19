### $match, $sort and $concat

```shell
db.books.aggregate([
    {
        $match: { price: { $gt: 160000 } }
    },
    {
        $sort: { title: 1 }
    },
    {
        $project: {
            title: { $concat: ["Judul Buku - ", "$title"] },
            price: 1,
            genre: 1,
        }
    }
])
```

### $lookup

```shell
db.bookshelves.aggregate([
    {
        $lookup: {
               from: "books",
               localField: "books",
               foreignField: "id",
               as: "bookDetails"
            }
    }
])
```
