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
let currencyNote = document.querySelector(".button-currency");
const editCid = document.querySelector(".edit-note");

let isDisplayed = false;
//* events
balance.addEventListener("click", display);
currencyNote.addEventListener("click", HideCurrencyTable);
// editCid.addEventListener("click", showcid);

function HideCurrencyTable(e) {
  e.preventDefault();
  displayCurrency = document.querySelector(".display-currency-div");
  if (displayCurrency.style.display === "none") {
    displayCurrency.style.display = "block";
    currencyNote.textContent = "Hide currency Note";
  } else {
    displayCurrency.style.display = "none";
    currencyNote.textContent = "Show Currency";
  }
}

/**
 * This function is called when it update the values of the bank note in the cid array
 * @param {Array} cid the cash-in-draw
 * @type {Array}
 */

function editCidArray() {
  let cidValue = document.getElementsByClassName("value");
  //* call init cid
  let Cid = [];
  for (let i = 0; i < 8; i++) {
    Cid[i] = [];
  }
  console.log(Cid);
  //*to initialize the cid Array
  for (let i = 0; i < cidValue.length; i++) {
    Cid[i][0] = cidValue[i].previousElementSibling.firstChild.nodeValue;
    Cid[i][1] = +cidValue[i].firstChild.nodeValue;
  }
  for (let i = 0; i < cidValue.length; i++) {
    console.log(cidValue[i].contentEditable);
    cidValue[i].addEventListener("dblclick", () => {
      if ((cidValue[i].contentEditable = "false")) {
        let temp = cidValue[i].firstChild.nodeValue;
        console.log("ancien value ", temp);
        cidValue[i].contentEditable = "true";

        cidValue[i].onblur = function () {
          currentValue = cidValue[i].firstChild.nodeValue;
          console.log("current value ", currentValue);
          if (currentValue != temp) {
            console.log("there is difference");
            Cid[i][1] = +currentValue;
          }
        };

        console.log(Cid);
      }
    });
  }
  return Cid;
}

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
    let cid = editCidArray();
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
  let cidOject = cid.reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  let objectToReturn = {
    status: "INSUFFICIENT_FUNDS",
    change: [],
  };

  let totalInCash = 0;
  for (let elem of Object.values(cidOject)) {
    totalInCash += elem;
  }
  totalInCash.toFixed(2);

  let balance = (cash - price).toFixed(2);
  if (balance < 0) {
    return "Your Cash is not Enougth! kindly add Money";
  }
  if (totalInCash - balance == 0) {
    objectToReturn = { status: "CLOSED", change: cid };
    for (let i = 0; i < cidValue.length; i++) {
      cid[i][1] = 0;
    }
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
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);

        } else {
          console.log("case of first lessMultipleOfcurrentMoney");
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }

        cid[i][1] = (cid[i][1] - lessMultipleOfcurrentMoney).toFixed(2);
        obj[cid[i][0]] = lessMultipleOfcurrentMoney;
        if(balance == 0){break;}
      }
    }
      const CID = Object.entries(obj);
      objectToReturn = { status: "OPEN", change: CID };
      return [objectToReturn, cid];
  }
}
