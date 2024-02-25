const fromCurrencyElement = document.getElementById('fromCurrency');
const toCurrencyElement = document.getElementById('toCurrency');
const amountElement = document.getElementById('amount');
const resultElement = document.getElementById('result');
fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => response.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.textContent = currency;
            option2.textContent = currency;
            fromCurrencyElement.appendChild(option1);
            toCurrencyElement.appendChild(option2);
        });
    });
function convertCurrency() {
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    const amount = amountElement.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            const result = amount * exchangeRate;
            resultElement.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error(`Error fetching exchange rates:`, error);
        });
}
