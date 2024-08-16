### $project and $addFields

```shell
db.bookshelves.aggregate([
    {
        $addFields: {
            totalPrice: { $sum: "$books.price" }
        }
    },
    {
        $project: {
            name: 1,
            totalPrice: 1,
            "books.title": 1,
            "books.price": 1,
        }
    }
])
```

### $unwind

```shell
db.bookshelves.aggregate([
    {
        $unwind: "$books"
    }
])
```
