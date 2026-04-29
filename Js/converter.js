const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const result = document.getElementById("result");
const btn = document.getElementById("convertBtn");

/* USD base rates */
const rates = {
  USD: 1,
  INR: 83,
  EUR: 0.92,
  GBP: 0.78,
  JPY: 155
};

btn.addEventListener("click", () => {

  const value = amount.value;

  if (!value) {
    result.innerText = "Enter amount";
    return;
  }

  const converted = value * rates[currency.value];

  result.innerText = `${currency.value} ${converted.toFixed(2)}`;

});