import './style.css';

import { fetchData } from './js/helpers/fetchData.js';
import { validateFstSource } from './js/validators/validateFstSource.js';
import { validateSecSource } from './js/validators/validateSecSource.js';
import { calculateTotalRevenue } from './js/calculateRevenue.js';
import { renderRevenue, renderErrorRevenue } from './js/renderRevenue.js';
import { API_KEY_TO_CURRENCY } from '../config.js';

const CURRENCY_URL = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY_TO_CURRENCY}`
const FIRST_SOURCE_URL = 'https://cpa-server-vtel.onrender.com/api/finance1';
const SECOND_SOURCE_URL = 'https://cpa-server-vtel.onrender.com/api/finance2';
const layoutForRender = document.querySelector('.layout');


let firstData = null;
let secondData = null;
let currency = null;

try {
  [firstData, secondData, currency] = await Promise.all([
    fetchData(FIRST_SOURCE_URL),
    fetchData(SECOND_SOURCE_URL),
    fetchData(CURRENCY_URL)
  ]);

} catch (error) {
  console.error("Ошибка загрузки данных:", error);
  renderErrorRevenue(layoutForRender, error);
}
// currency = { rates: {} };
// const firstData = { transactions: ["USD", "EUR"] };
// const secondData = ["EUR", "GBP"];
// const firstData = { transactions: [] };
// const secondData = ["EUR", "GBP"];

console.log('firstData', firstData);
console.log('secondData', secondData);
console.log('currency', currency.rates);
console.log('------------------------');


try {
  validateFstSource(firstData);
  validateSecSource(secondData);
  let totalFirstSource = calculateTotalRevenue(firstData.transactions, currency);
  let totalSecSource = calculateTotalRevenue(secondData, currency);
  let totalBothSources = totalFirstSource + totalSecSource;
  renderRevenue(firstData.transactions, secondData, currency, totalFirstSource, totalSecSource, totalBothSources, layoutForRender);
} catch (error) {
  renderErrorRevenue(layoutForRender, error);
}
