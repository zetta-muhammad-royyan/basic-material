import express from "express"
import bodyParser from "body-parser"
import { books } from "./books.js"
import { calculateCredit } from "./helper.js"

// PARAMETERS
const DISCOUNT = 20
const TAX = 10

const app = express()
app.use(bodyParser.json())

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username === 'royyan' && password === 'ggez') {
        req.user = { username }
        next()
    } else {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
}

app.get('/', (req, res) => {
    res.send({ message: "hello" })
})

app.post('/purchase', authMiddleware, (req, res) => {
    const { bookID, credit, quantity } = req.body

    let book = books.find(book => book.id === bookID)
    if (!book) {
        return res.status(404).json({ message: `Cannot find book with id ${bookID}` })
    }

    if (quantity > book.stock) {
        return res.status(400).json({ message: `Maximum purchase is ${book.stock}` })
    }

    let priceStart = quantity * book.price
    let discountAmount = (priceStart * DISCOUNT) / 100
    let taxAmount = (priceStart * TAX) / 100
    let finalPrice = priceStart - discountAmount + taxAmount

    return res.status(200).json({
        totalAmount: finalPrice,
        credits: calculateCredit(credit, finalPrice)
    })
})



app.listen(8080, () => {
    console.log('Server running on port 8080')
})