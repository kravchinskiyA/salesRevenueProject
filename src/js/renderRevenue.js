import { calculateItemRevenue } from './calculateRevenue.js'


function renderEmptyTransactionRow() {
    return `
    <tr>
        <td colspan="5" class="text-center">Транзакций нет</td>
    </tr>
    `
}
function returnTransactionAmount(transaction) {
    return Number(transaction.split(" ")[0])
}

function returnTransactionCurrency(transaction) {
    return transaction.split(" ")[1].toUpperCase()
}

function plural(count, one, few, many) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod100 >= 11 && mod100 <= 14) {
        return many;
    }

    if (mod10 === 1) {
        return one;
    }

    if (mod10 >= 2 && mod10 <= 4) {
        return few;
    }

    return many;
}

export function renderRevenue(firstData, secondData, currency, total1, total2, totalBoth) {

    const statsBothTotal = document.querySelector('#grand-total');
    const statsFirstTotal = document.querySelector('#first-source-summary');
    const statsSecondTotal = document.querySelector('#second-source-summary');

    const firstTableBody = document.querySelector('#first-source-body');
    const secondTableBody = document.querySelector('#second-source-body');

    const firstSourceTableTotal = document.querySelector('#first-source-total');
    const secondSourceTableTotal = document.querySelector('#second-source-total');



    const firstSourceCount = document.querySelector('#first-source-count');
    const secondSourceCount = document.querySelector('#second-source-count');

    if (statsFirstTotal) {
        statsFirstTotal.textContent = `$ ${total1}`;
    } else {
        console.warn('Element #first-source-summary not found');
    }
    if (statsSecondTotal) {
        statsSecondTotal.textContent = `$ ${total2}`;
    } else {
        console.warn('Element #second-source-summary not found');
    }
    if (statsBothTotal) {
        statsBothTotal.textContent = `$ ${totalBoth}`;
    } else {
        console.warn('Element #grand-total not found');
    }

    if (firstSourceTableTotal) {
        firstSourceTableTotal.textContent = total1;
    } else {
        console.warn('Element #first-source-total not found');
    }
    if (secondSourceTableTotal) {
        secondSourceTableTotal.textContent = total2;
    } else {
        console.warn('Element #second-source-total not found');
    }
    if (firstSourceCount) {
        firstSourceCount.textContent = `${firstData.length} ${plural(firstData.length, 'транзакция', 'транзакции', 'транзакций')}`
    } else {
        console.warn('Element #first-source-count not found');
    }
    if (secondSourceCount) {
        secondSourceCount.textContent = `${secondData.length} ${plural(secondData.length, 'транзакция', 'транзакции', 'транзакций')}`
    } else {
        console.warn('Element #second-source-count not found');
    }

    if (firstData.length > 0) {
        firstTableBody.textContent = '';
        firstData.forEach((transaction, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="mono">#${index + 1}</td>
                <td class="num">${transaction.amount}</td>
                <td><span class="currency">${transaction.currency}</span></td>
                <td class="num">${currency.rates[transaction.currency]}</td>
                <td class="num strong">${calculateItemRevenue(transaction, currency)}</td>
            `;
            firstTableBody.appendChild(row);
        });
    } else {
        firstTableBody.innerHTML = renderEmptyTransactionRow();
        console.warn('Element #first-source-body not found');
    }

    if (secondData.length > 0) {
        secondTableBody.textContent = '';
        secondData.forEach((transaction, index) => {
            // console.log(transaction);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="mono">#${index + 1}</td>
                <td class="num">${returnTransactionAmount(transaction)}</td>
                <td><span class="currency">${returnTransactionCurrency(transaction)}</span></td>
                <td class="num">${currency.rates[returnTransactionCurrency(transaction)]}</td>
                <td class="num strong">${calculateItemRevenue(transaction, currency)}</td>
            `;
            secondTableBody.appendChild(row);
        });
    } else {
        secondTableBody.innerHTML = renderEmptyTransactionRow();
        console.warn('Element #second-source-body not found');
    }
}

export function renderErrorRevenue(layoutForRender, error) {
    if (layoutForRender) {
        console.log('test', layoutForRender.querySelector('.stats'));
        layoutForRender.querySelector('.stats').remove();
        layoutForRender.querySelector('.tables').remove();

        const errorSection = document.createElement('section');
        errorSection.className = 'error';
        errorSection.innerHTML = `
            <div class="error">${error}</div>
        `;
        layoutForRender.querySelector('main').appendChild(errorSection);
    }
}