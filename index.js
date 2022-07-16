const result = document.querySelector("#result");
const currencySelection = document.querySelector("#currencySelection");
const userInput = document.querySelector("#userInput");
const form = document.querySelector("#form");

let amount = 0;
let exchange = 0;
let currency = [];
const endpoint = fetch("http://api.nbp.pl/api/exchangerates/tables/A/today/");

endpoint
  .then((data) => {
    return data.json();
  })
  .then((response) => {
    currency = response[0].rates;
  })
  .then(() => {
    setTheCurrencies();
  })
  .catch((error) => {
    console.error(error);
  });

function setTheCurrencies() {
  currency.forEach((el) => {
    const option = document.createElement("option");
    option.setAttribute("value", el.mid);
    option.textContent = el.code;
    currencySelection.appendChild(option);
  });
}

currencySelection.addEventListener("change", (e) => {
  exchange = Number(e.target.value);
});
userInput.addEventListener("change", (e) => {
  amount = Number(e.target.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!amount || !exchange) {
    return;
  }
  const finalResult = amount * exchange;
  result.textContent = finalResult.toFixed(2);
  userInput.value = "";
});
window.onload = function () {
  userInput.value = "";
};
