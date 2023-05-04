const cid = [
  ["PENNY", 0.5],
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

  let balance = cash - price;
  if (balance == totalInCash) {
    objectToReturn = { status: "CLOSED", change: cid };
    return objectToReturn;
  } else if (totalInCash < balance) {
    return objectToReturn;
  } else {
    let i = 0;
    let balanceHelp = balance;
    do {
      console.log(balance);
      if (balanceHelp >= 20 && cidOject.TWENTY > 0) {
        console.log();
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
        console.log("TWENTY " + lessMultipleOfcurrentMoney);
        cidOject.TWENTY -= lessMultipleOfcurrentMoney;
      } else if (balanceHelp >= 10 && cidOject.TEN > 0) {
        console.log();
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
        console.log("TEN " + lessMultipleOfcurrentMoney);
        // let current = cid.find((elem) => elem[0] == "TEN");
        cidOject.TEN = lessMultipleOfcurrentMoney;
        // current[1] = lessMultipleOfcurrentMoney;
        // newCid.push(current);
      } else if (balanceHelp >= 5 && cidOject.FIVE > 0) {
        console.log();
        let lessMultipleOfcurrentMoney = Math.floor(balance / 5) * 5;
        if (lessMultipleOfcurrentMoney > cidOject.FIVE) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.FIVE / 5) * 5;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        console.log("FIVE " + lessMultipleOfcurrentMoney);
        cidOject.FIVE = lessMultipleOfcurrentMoney;
        balanceHelp = balance % 5;
      } else if (balance >= 1 && cidOject.ONE > 0) {
        console.log();
        let lessMultipleOfcurrentMoney = Math.floor(balance);
        if (lessMultipleOfcurrentMoney >= cidOject.ONE) {
          balance -= cidOject.ONE;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        console.log("ONE " + lessMultipleOfcurrentMoney);
        cidOject.ONE = lessMultipleOfcurrentMoney;
      } else if (balance > 0.25 && cidOject.QUARTER > 0) {
        console.log();
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
        console.log("QUATER " + lessMultipleOfcurrentMoney);
        cidOject.QUARTER = lessMultipleOfcurrentMoney;
      } else if (balance > 0.1 && cidOject.DIME > 0) {
        console.log();
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.1) * 0.1;
        if (lessMultipleOfcurrentMoney >= cidOject.DIME) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.DIME / 0.1) * 0.1;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        console.log("DIME " + lessMultipleOfcurrentMoney);
        cidOject.DIME = lessMultipleOfcurrentMoney;
      } else if (balance > 0.05 && cidOject.NICKEL > 0) {
        console.log();
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
        console.log("NICKEL " + lessMultipleOfcurrentMoney);
        cidOject.NICKEL = lessMultipleOfcurrentMoney;
      } else if (balance > 0.01 && cidOject.PENNY > 0) {
        console.log();
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.01) * 0.01;
        if (lessMultipleOfcurrentMoney >= cidOject.PENNY) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.PENNY / 0.01) * 0.01;
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        } else {
          balance -= lessMultipleOfcurrentMoney;
          balance = balance.toFixed(2);
        }
        console.log("PENNY " + lessMultipleOfcurrentMoney);
        cidOject.PENNY = lessMultipleOfcurrentMoney;
      }
      i += 1;
    } while (balance > 0 && i < 10);
    if (balance == 0) {
      const CID = Object.entries(cidOject);
      objectToReturn = { status: "OPEN", change: CID };
      return objectToReturn;
    }
  }
}

let objectToReturne = checkCashRegister(19.5, 20, cid);
console.log(objectToReturne);
