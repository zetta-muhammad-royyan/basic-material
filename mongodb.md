### Pagination using $skip and $limit

```shell
db.books.aggregate([
    {
        $sort: { title: 1 }
    },
    {
        $skip: 5
    },
    {
        $limit: 5
    }
])
```

### $facet

```shell
db.books.aggregate([
    {
        $facet: {
            "Fantasy": [
                { $match: { genre: "Fantasy" } },
                { $sort: { title: 1 } },
            ],
            "Science Fiction": [
                { $match: { genre: "Science Fiction" } },
                { $sort: { title: 1 } },
            ],
            "Mystery": [
                { $match: { genre: "Mystery" } },
                { $sort: { title: 1 } },
            ]
        }
    }
])
```

### $group

```shell
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            books: { $push: {
                _id: "$_id",
                title: "$title",
                price: "$price",
                stock: "$stock"
            }},
        }
    },
    {
        $sort: { _id: 1 }
    }
])

```
