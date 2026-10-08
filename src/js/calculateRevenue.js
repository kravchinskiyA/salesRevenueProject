export function calculateTotalRevenue(sourceTransactions, currency) {
    const currencyUSD = currency.rates;
    let totalRevenueUSD = 0;

    if (sourceTransactions.length === 0) {
        return totalRevenueUSD;
    }

    if (sourceTransactions.every(item => typeof item === 'object')) {

        for (const transaction of sourceTransactions) {
            if (transaction.currency.toUpperCase() === 'USD') {
                totalRevenueUSD += transaction.amount;
            } else if (currencyUSD[transaction.currency]) {
                totalRevenueUSD += transaction.amount / currencyUSD[transaction.currency.toUpperCase()];
            }
        }
    }
    if (sourceTransactions.every(item => typeof item === 'string')) {

        for (const transaction of sourceTransactions) {
            if (transaction.split(" ")[1].toUpperCase() === 'USD') {
                totalRevenueUSD += Number(transaction.split(" ")[0]);
            } else if (currencyUSD[transaction.split(" ")[1].toUpperCase()]) {
                totalRevenueUSD += Number(transaction.split(" ")[0]) / currencyUSD[transaction.split(" ")[1].toUpperCase()];
            }
        }
    }

    return Number(totalRevenueUSD.toFixed(2));

}

export function calculateItemRevenue(transaction, currency) {
    let sum = 0;
    const currencyUSD = currency.rates;

    if (typeof transaction === 'object') {
        if (transaction.currency.toUpperCase() === 'USD') {
            sum += transaction.amount;
        } else if (currencyUSD[transaction.currency]) {
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

    return Number(sum.toFixed(4));
}

