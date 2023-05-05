cid = [
  ["PENNY", 0.01],
  ["NICKEL", 0],
  ["DIME", 0],
  ["QUARTER", 0],
  ["ONE", 0],
  ["FIVE", 0],
  ["TEN", 0],
  ["TWENTY", 0],
  ["ONE HUNDRED", 0],
];

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

//* test

balance.addEventListener("click", display);

function display() {
  const price = +document.querySelector("#price").value;
  const cash = +document.querySelector("#cash").value;
console.log(cash, price);
  if (cash > 0 && price > 0) {
     console.log(cid);
     cid.innerHTML = JSON.stringify(cid);;
    let show = checkCashRegister(price, cash, cid);
    displayBalance.innerHTML = JSON.stringify(show);
  }else {
    alert('No Negative or Empty input value allowed')
  }
 
}

function checkCashRegister(price, cash, cid) {
  let cidOject = cid.reduce((acc, curr) => {
    acc[curr[0]] = curr[1];
    return acc;
  }, {});

  let totalInCash = 0;
  for (let elem of Object.values(cidOject)) {
    totalInCash += elem;
  }
  totalInCash = totalInCash.toFixed(2);
  let objectToReturn = {
    status: "INSUFFICIENT_FUNDS",
    change: [],
  };

  let balance = (cash - price).toFixed(2);
  if(balance < 0){
     return "Your Cash is not Enougth";
  }
  console.log("balance : ",balance);
  console.log("totalInCash", totalInCash);
  console.log(totalInCash - balance);
  if ( totalInCash - balance == 0) {
    console.log("balance - totalInCash");
    objectToReturn = { status: "CLOSED", change: cid };
    return objectToReturn;
  } else if ( totalInCash - balance < 0) {
    return objectToReturn;
  } else {
    let i = 0;
    let balanceHelp = balance;
    let obj = {};
    while (balance > 0 && i < 9) {
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
        if (balance != 0) {
          return objectToReturn;
        }
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
      console.log(newObj);
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
