const currencyTable = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  Five: 5,
  FIVE: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

//* bind the html element
const balance = document.querySelector(".balance");

const displayBalance = document.querySelector(".display-for-the-balance");
const displayCid = document.querySelector(".cid");
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

//* function to create the cid array
function initCid() {
  let newcid = [];
  for (let i = 0; i < 8; i++) {
    newcid[i] = [];
  }
  return newcid;
}

/**
 * This function is called when it update the values of the bank note in the cid array
 * @param {Array} cid the cash-in-draw
 * @type {Array}
 */

function editCidArray() {
  let cidValue = document.getElementsByClassName("value");
  //* call init cid
  let nCid = initCid();
  console.log(nCid);
  //*to initialize the cid Array
  for (let i = 0; i < cidValue.length; i++) {
    nCid[i][0] = cidValue[i].previousElementSibling.firstChild.nodeValue;
    nCid[i][1] = +cidValue[i].firstChild.nodeValue;

  }
  console.log(nCid);
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
            nCid[i][1] = +currentValue;
          }
        };

        console.log(nCid);
      }
    });
  }
  return nCid;
}

let cid = editCidArray();
console.log(cid);

/**
 * this function display the result of checkCashRegister function
 * @type {void}
 */
function display() {
  const price = +document.querySelector("#price").value;
  const cash = +document.querySelector("#cash").value;
  console.log(cash, price);
  if (cash > 0 && price > 0) {
    console.log(cid);
    displayCid.innerHTML = JSON.stringify(cid);
    let show = checkCashRegister(price, cash, cid);
    displayBalance.innerHTML = JSON.stringify(show);
  } else {
    alert("No Negative or Empty input value allowed");
  }
}

/**
 * This function return the user's change with as few notes from our cash register as possible.
 * @param {number} price
 * @param {number} cash
 * @param {Array<Array>} cid
 * @returns object;
 */

function checkCashRegister(price, cash, cid) {
  let cidOject = cid.reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  let totalInCash = 0;
  for (let elem of Object.values(cidOject)) {
    totalInCash += elem;
    console.log(totalInCash);
  }
  console.log("total in cash is ", totalInCash)
  totalInCash.toFixed(2);
  let objectToReturn = {
    status: "INSUFFICIENT_FUNDS",
    change: [],
  };

  let balance = (cash - price).toFixed(2);
  if (balance < 0) {
    return "Your Cash is not Enougth! kindly add Money";
  }
  if (totalInCash - balance == 0) {
    console.log("balance - totalInCash");
    objectToReturn = { status: "CLOSED", change: cid };
    for (let i = 0; i < cidValue.length; i++) {
      cid[i][1] = 0;
    }
    return [objectToReturn,cid];
  } else if (totalInCash - balance < 0) {
    return [objectToReturn,cid];
  } else {
    let i = 0;
    let balanceHelp = balance;
    let obj = {};
    while (balance > 0 && i < 8) {
      if (balanceHelp >= 20 && cidOject.TWENTY > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 20) * 20;
        if (lessMultipleOfcurrentMoney > cidOject.TWENTY) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.TWENTY / 20) * 20;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        balanceHelp = balance % 20;
        cidOject.TWENTY -= lessMultipleOfcurrentMoney;
        obj.TWENTY = lessMultipleOfcurrentMoney;
      } else if (balanceHelp >= 10 && cidOject.TEN > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 10) * 10;
        if (lessMultipleOfcurrentMoney > cidOject.TEN) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.TEN / 10) * 10;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        balanceHelp = balance % 10;
        // let current = cid.find((elem) => elem[0] == "TEN");
        cidOject.TEN -= lessMultipleOfcurrentMoney;
        // current[1] = lessMultipleOfcurrentMoney;
        // newCid.push(current);
        obj.TEN = lessMultipleOfcurrentMoney;
      } else if (balanceHelp >= 5 && cidOject.FIVE > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 5) * 5;
        if (lessMultipleOfcurrentMoney > cidOject.FIVE) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.FIVE / 5) * 5;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        cidOject.FIVE -= lessMultipleOfcurrentMoney;
        balanceHelp = balance % 5;
        obj.FIVE = lessMultipleOfcurrentMoney;
      } else if (balance >= 1 && cidOject.ONE > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance);
        if (lessMultipleOfcurrentMoney >= cidOject.ONE) {
          balance -= cidOject.ONE;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        cidOject.ONE -= lessMultipleOfcurrentMoney;
        obj.ONE = lessMultipleOfcurrentMoney;
      } else if (balance >= 0.25 && cidOject.QUARTER > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.25) * 0.25;
        if (lessMultipleOfcurrentMoney >= cidOject.QUARTER) {
          lessMultipleOfcurrentMoney =
            Math.floor(cidOject.QUARTER / 0.25) * 0.25;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        cidOject.QUARTER -= lessMultipleOfcurrentMoney;
        obj.QUARTER = lessMultipleOfcurrentMoney;
      } else if (balance >= 0.1 && cidOject.DIME > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.1) * 0.1;
        if (lessMultipleOfcurrentMoney >= cidOject.DIME) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.DIME / 0.1) * 0.1;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        cidOject.DIME -= lessMultipleOfcurrentMoney;
        obj.DIME = lessMultipleOfcurrentMoney;
      } else if (balance >= 0.05 && cidOject.NICKEL > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.05) * 0.5;
        if (lessMultipleOfcurrentMoney >= cidOject.NICKEL) {
          lessMultipleOfcurrentMoney =
            Math.floor(cidOject.NICKEL / 0.05) * 0.05;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        cidOject.NICKEL -= lessMultipleOfcurrentMoney;
        obj.NICKEL = lessMultipleOfcurrentMoney;
      } else if (balance >= 0.01 && cidOject.PENNY > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.01) * 0.01;
        if (lessMultipleOfcurrentMoney >= cidOject.PENNY) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.PENNY / 0.01) * 0.01;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        cidOject.PENNY -= lessMultipleOfcurrentMoney;
        obj.PENNY = lessMultipleOfcurrentMoney;
        // if (balance != 0) {
        //   return objectToReturn;
        // }
      }
      i += 1;
      console.log(balance);
    }
    if (balance == 0) {
      const CID = Object.entries(obj);
      const msg = "here balance is " + balance;
      objectToReturn = { status: "OPEN", change: CID };
      console.log(msg);
      console.log(objectToReturn);
      let newObj = Object.entries(cidOject);
      return objectToReturn;
    }
  }
}

// let objectToReturne = checkCashRegister(19.5, 20, [
//   ["PENNY", 0.5],
//   ["NICKEL", 0],
//   ["DIME", 0],
//   ["QUARTER", 0],
//   ["ONE", 0],
//   ["FIVE", 0],
//   ["TEN", 0],
//   ["TWENTY", 0],
//   ["ONE HUNDRED", 0],
// ]);

// console.log(objectToReturne);
