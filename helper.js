const calculateCredit = (totalMonth, totalPrice) => {
    let credits = []
    let currentDate = new Date
    for (let i = 1; i <= totalMonth; i++) {
        let dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, currentDate.getDate())
        let credit = {
            dueDate: dueDate.toISOString().split("T")[0],
            amount: Math.ceil(totalPrice / totalMonth)
        }

        credits.push(credit)
    }

    return credits
}

export { calculateCredit }