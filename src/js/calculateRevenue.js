export function calculateTotalRevenue(sourceTransactions, currency) {
    if (Object.keys(currency.rates).length === 0) {
        throw new Error("Currency rates are not available");
    }

    // Складываем округлённые суммы строк в центах — итог совпадает с таблицей
    const totalCents = sourceTransactions.reduce(
        (acc, transaction) => acc + Math.round(calculateItemRevenue(transaction, currency) * 100),
        0
    );

    return totalCents / 100;
}

export function calculateItemRevenue(transaction, currency) {
    if (Object.keys(currency.rates).length === 0) {
        throw new Error("Currency rates are not available");
    }
    let sum = 0;
    const currencyUSD = currency.rates;

    if (typeof transaction === 'object') {
        if (transaction.currency.toUpperCase() === 'USD') {
            sum += transaction.amount;
        } else if (currencyUSD[transaction.currency.toUpperCase()]) {
            sum += transaction.amount / currencyUSD[transaction.currency.toUpperCase()];
        }
    }

    if (typeof transaction === 'string') {
        if (transaction.split(" ")[1].toUpperCase() === 'USD') {
            sum += Number(transaction.split(" ")[0]);
        } else if (currencyUSD[transaction.split(" ")[1].toUpperCase()]) {
            sum += Number(transaction.split(" ")[0]) / currencyUSD[transaction.split(" ")[1].toUpperCase()];
        }
    }

    return Number(sum.toFixed(2));
}

