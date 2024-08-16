### Insert One

```shell
# created objectId -> 66bf1dc85ceb2617b881a6a8
db.profiles.insertOne({
    name: "Muhammad Pandu Royyan",
    email: "mproyyan@gmail.com",
    address: {
        city: "Sleman",
        country: "Indonesia"
    },
    hobbies: ["Cycling", "Hiking"]
})
```

### Insert Many

```shell
# created objectId -> [66bf1f2d5ceb2617b881a6a9, 66bf1f2d5ceb2617b881a6aa]
db.profiles.insertMany([
    {
        name: "Dummy 1",
        email: "dummy1@gmail.com",
        address: {
            city: "XX",
            country: "Z Country"
        },
        hobbies: ["Gaming", "Reading"]
    },
    {
        name: "Dummy 2",
        email: "dummy2@gmail.com",
        address: {
            city: "yy",
            country: "Z Country"
        },
        hobbies: ["Coding"]
    }
])
```

### Find One

```shell
db.profiles.findOne({_id: ObjectId("66bf1f2d5ceb2617b881a6a9")})
```

### Find Many

```shell
# without filter
db.profiles.find()

# with filter
db.profiles.find({"address.country": "Z Country"})
```

### Update One

```shell
db.profiles.updateOne(
    {_id: ObjectId("66bf1dc85ceb2617b881a6a8")},
    { $push: { hobbies: "Gaming" } }
)
```

### Update Many

```shell
db.profiles.updateMany(
    { "address.country": "Z Country" },
    { $set: { "address.city": "ZZ City" } }
)
```

### Delete One

```shell
db.profiles.deleteOne({ _id: ObjectId("66bf1f2d5ceb2617b881a6a9") })
```

### Delete Many

```shell
db.profiles.deleteMany({ "address.country": "Z Country" })
```
