const currencyTable = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUATER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
};

//* bind the html element
const balance = document.querySelector(".balance");
const displayBalance = document.querySelector(".display-for-the-balance");
const exchangeRate = document.querySelector(".rate");
const result = document.querySelector(".result-from-conversion");
const amount = document.querySelector(".amount");
const convertBtn = document.querySelector(".convert-result");
const source_currency = document.querySelector(".source-currency");
const target_currency = document.querySelector(".target-currency");
const cash = document.querySelector("#cash");
const decimalPartOfCid = document.querySelector(".decimalpart");
const wholePartOfCid = document.querySelector(".wholepart");
const needConversion = document.querySelector(".need-to-change");
const currency_exchange = document.querySelector(".exchange");

//* events
balance.addEventListener("click", display);
convertBtn.addEventListener("click", convert);
// needConversion.addEventListener("click", HideCurrencyTable);
// function HideCurrencyTable(e) {
//   e.preventDefault();
  

//   if (currency_exchange.style.display === "none") {
//     currency_exchange.style.display = "block";
//   } else {
//     currency_exchange.style.display = "none";
//     currencyNote.textContent = "Show Currency";
//   }
// }

//* function to init the cid with the updated new values added by user

/**
 * This function is called when it update the values of the bank note in the cid array
 * @param {Array} cid the cash-in-draw
 * @type {Array}
 */

function editCidArray() {
  // init new cid
  let Cid = [];
  for (let i = 0; i < 8; i++) {
    Cid[i] = [];
  }
  // we call all the values of the cid cash register and initialize it with currency names and values
  let cidValues = document.getElementsByClassName("value");
  for (let i = 0; i < cidValues.length; i++) {
    Cid[i][0] = cidValues[i].previousElementSibling.firstChild.nodeValue;
    Cid[i][1] = cidValues[i].firstChild.nodeValue;
  }
  console.log(Cid);
  //* we add event listeners on each currency value to update it

  for (let i = 0; i < cidValues.length; i++) {
    cidValues[i].ondblclick = function () {
      if (this.hasAttribute("data-clicked")) {
        return false;
      }
      this.setAttribute("data-clicked", "yes");
      this.setAttribute("data-text", this.innerHTML);

      let input = document.createElement("input");
      input.setAttribute("type", "text");
      input.value = this.innerHTML;
      console.log(this.innerHTML);
      input.style.width = 60 + "px";
      input.style.height = 30 + "px";
      input.style.fontFamily = "inherit";

      input.onblur = function () {
        let span = input.parentElement;
        let original_text = input.parentElement.getAttribute("data-text");
        let current_text = this.value;

        if (original_text != current_text) {
          span.removeAttribute("data-clicked");
          span.removeAttribute("data-text");
          span.innerHTML = current_text;
        } else {
          span.removeAttribute("data-clicked");
          span.removeAttribute("data-text");
          span.innerHTML = original_text;
        }
        Cid[i][1] = +span.innerHTML;
        console.log(Cid[i][1]);
      };

      this.innerHTML = "";
      this.appendChild(input);
      this.firstElementChild.select();
    };
  }
  console.log(Cid);
  return Cid;
}
let cid = editCidArray();
console.log(cid);
//* function to display result
/**/
/**
 * this function display the result of checkCashRegister function
 * @type {void}
 */
function display() {
  const price = +document.querySelector("#price").value;
  const cash = +document.querySelector("#cash").value;
  console.log(cash, price);
  if (cash > 0 && price > 0) {
    const show = checkCashRegister(price, cash, cid);
    if (typeof show !== "undefined") {
      displayBalance.innerHTML = JSON.stringify(show[0]);
    } else {
      alert("show variable is undefined");
    }

    // displayCid.innerHTML = JSON.stringify(show[1]);
    let CID = show[1];
    let cidValue = document.getElementsByClassName("value");

    for (let i = 0; i < CID.length; i++) {
      cidValue[i].firstChild.nodeValue = CID[i][1];
    }
  } else {
    alert("No Negative or Empty input value allowed");
  }
}

/**
 * This function return the user's change with as few notes from our cash register as possible.
 * @param {number} price
 * @param {number} cash
 * @param {Array<Array>} cid
 * @returns array;
 */

function checkCashRegister(price, cash, cid) {
  //to get object from cid array for easy manipulations
  let cidOject = cid.reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  // to init the object to be returned
  let objectToReturn = {
    status: "INSUFFICIENT_FUNDS",
    change: [],
  };

  // to get the total in cash
  let totalInCash = 0;
  for (let elem of Object.values(cidOject)) {
    totalInCash += elem;
  }
  totalInCash.toFixed(2);

  //to get the balance
  let balance = (cash - price).toFixed(2);

  // some basic checks
  if (balance < 0) {
    return "Your Cash is not Enougth! kindly add Money";
  } else if (totalInCash - balance == 0) {
    for (let i = 0; i < cid.length; i++) {
      cid[i][1] = 0;
    }
    objectToReturn = { status: "CLOSED", change: Object.entries(cidOject) };
    return [objectToReturn, cid];
  } else if (totalInCash - balance < 0) {
    return [objectToReturn, cid];
  } else {
    let obj = {};

    for (let i = 7; i >= 0; i--) {
      if (balance >= currencyTable[cid[i][0]] && cid[i][1]) {
        let lessMultipleOfcurrentMoney =
          Math.floor(balance / currencyTable[cid[i][0]]) *
          currencyTable[cid[i][0]];

        if (lessMultipleOfcurrentMoney > cid[i][1]) {
          console.log("case of seconde lessMultipleOfcurrentMoney");
          lessMultipleOfcurrentMoney =
            Math.floor(cid[i][1] / currencyTable[cid[i][0]]) *
            currencyTable[cid[i][0]];
          balance = (balance - lessMultipleOfcurrentMoney).toFixed(2);
        } else {
          console.log("case of first lessMultipleOfcurrentMoney");
          balance = (balance - lessMultipleOfcurrentMoney).toFixed(2);
        }
        //to update the cid  and the displayed result
        cid[i][1] = (cid[i][1] - lessMultipleOfcurrentMoney).toFixed(2);
        obj[cid[i][0]] = lessMultipleOfcurrentMoney;

        //t stop looping if we rich zero
        if (balance == 0) {
          break;
        }
      }
    }
    objectToReturn = { status: "OPEN", change: Object.entries(obj) };
    return [objectToReturn, cid];
  }
}

//* gets exchange rate for specific currencies
const getExRate = async (frm, to) => {
  let req_url = `https://api.freecurrencyapi.com/v1/latest?apikey=oorxysDSyKKtPYwHIqSswZtS4njGQ858Gt7ehxYf&currencies=${to}&base_currency=${frm}`;
  let res = await fetch(req_url);
  let response = await res.json();

  return response.data[to];
};

//* loading the rates in the inputbox
const loadExchangeRate = async (frm, to) => {
  let rate = await getExRate(frm, to);

  exchangeRate.value = rate;
  //   disabling the exchange rate inputbox as the value is loaded beforehand
  exchangeRate.disabled = "true";
  return exchangeRate.value;
};

//*function to convert
async function convert() {
  source = source_currency.value.toString();
  target = target_currency.value.toString();
  //   basic validations
  if (source === target) {
    source_currency.focus();
    alert("source and target currency can't be same or empty !");
    return;
  } else if (source === "") {
    source_currency.focus();
    alert("source currency can't be empty !");
    return;
  } else if (target === "") {
    target_currency.focus();
    alert("target currency can't be empty !");
    return;
  } else {
    let asyncR = await loadExchangeRate(source, target);
    r = parseFloat(asyncR);
    // getting the amount and rate in float value
    let amt = parseFloat(amount.value);

    // basic validations
    if (isNaN(amt) || amt <= 0) {
      alert("Source amount need to be a positive number");
      amount.focus();
      return;
    }
    // setting the output inside an html element
    let res = amt * r;

    cash.value = parseFloat(res);
    result.innerHTML = res;
  }
}
// //* finction to store data
// function storeSessionData() {
//   sessionStorage.setItem("cid1", decimalPartOfCid.innerHTML);
//   sessionStorage.setItem("cid2", wholePartOfCid.innerHTML);
// }

// //* function to restitute data
// function showStoredData() {
//   decimalPartOfCid.innerHTML = sessionStorage.getItem("cid1");
//   wholePartOfCid.innerHTML = sessionStorage.getItem("cid2");
// }
