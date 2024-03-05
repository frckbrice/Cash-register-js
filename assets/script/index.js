const cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
]

const currencyTable = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  Five: 5,
  FIVE: 10,
  TWENTY: 20,
  'ONE HUNDRED': 100
}

function checkCashRegister (price, cash, cid) {
  const cidOject = cid.reduce((acc, curr) => {
    acc[curr[0]] = curr[1]
    return acc
  }, {})

  let totalInCash = 0
  for (const elem of Object.values(cidOject)) {
    totalInCash += elem
  }
  totalInCash = totalInCash.toFixed(2)
  let objectToReturn = {
    status: 'INSUFFICIENT_FUNDS',
    change: []
  }

  let balance = cash - price
  if (balance == totalInCash) {
    objectToReturn = { status: 'CLOSED', change: cid }
    return objectToReturn
  } else if (totalInCash < balance) {
    return objectToReturn
  } else {
    let i = 0
    let balanceHelp = balance
    const obj = {}
    do {
      if (balanceHelp >= 20 && cidOject.TWENTY > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 20) * 20
        if (lessMultipleOfcurrentMoney > cidOject.TWENTY) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.TWENTY / 20) * 20
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        balanceHelp = balance % 20
        cidOject.TWENTY -= lessMultipleOfcurrentMoney
        obj.TWENTY = lessMultipleOfcurrentMoney
      } else if (balanceHelp >= 10 && cidOject.TEN > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 10) * 10
        if (lessMultipleOfcurrentMoney > cidOject.TEN) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.TEN / 10) * 10
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        balanceHelp = balance % 10
        // let current = cid.find((elem) => elem[0] == "TEN");
        cidOject.TEN -= lessMultipleOfcurrentMoney
        // current[1] = lessMultipleOfcurrentMoney;
        // newCid.push(current);
        obj.TEN = lessMultipleOfcurrentMoney
      } else if (balanceHelp >= 5 && cidOject.FIVE > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 5) * 5
        if (lessMultipleOfcurrentMoney > cidOject.FIVE) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.FIVE / 5) * 5
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        cidOject.FIVE -= lessMultipleOfcurrentMoney
        balanceHelp = balance % 5
        obj.FIVE = lessMultipleOfcurrentMoney
      } else if (balance >= 1 && cidOject.ONE > 0) {
        const lessMultipleOfcurrentMoney = Math.floor(balance)
        if (lessMultipleOfcurrentMoney >= cidOject.ONE) {
          balance -= cidOject.ONE
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        cidOject.ONE -= lessMultipleOfcurrentMoney
        obj.ONE = lessMultipleOfcurrentMoney
      } else if (balance > 0.25 && cidOject.QUARTER > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.25) * 0.25
        if (lessMultipleOfcurrentMoney >= cidOject.QUARTER) {
          lessMultipleOfcurrentMoney =
            Math.floor(cidOject.QUARTER / 0.25) * 0.25
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        cidOject.QUARTER -= lessMultipleOfcurrentMoney
        obj.QUARTER = lessMultipleOfcurrentMoney
      } else if (balance > 0.1 && cidOject.DIME > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.1) * 0.1
        if (lessMultipleOfcurrentMoney >= cidOject.DIME) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.DIME / 0.1) * 0.1
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        cidOject.DIME -= lessMultipleOfcurrentMoney
        obj.DIME = lessMultipleOfcurrentMoney
      } else if (balance > 0.05 && cidOject.NICKEL > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.05) * 0.5
        if (lessMultipleOfcurrentMoney >= cidOject.NICKEL) {
          lessMultipleOfcurrentMoney =
            Math.floor(cidOject.NICKEL / 0.05) * 0.05
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        cidOject.NICKEL -= lessMultipleOfcurrentMoney
        obj.NICKEL = lessMultipleOfcurrentMoney
      } else if (balance > 0.01 && cidOject.PENNY > 0) {
        let lessMultipleOfcurrentMoney = Math.floor(balance / 0.01) * 0.01
        if (lessMultipleOfcurrentMoney >= cidOject.PENNY) {
          lessMultipleOfcurrentMoney = Math.floor(cidOject.PENNY / 0.01) * 0.01
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        } else {
          balance -= lessMultipleOfcurrentMoney
          balance = balance.toFixed(2)
        }
        cidOject.PENNY -= lessMultipleOfcurrentMoney
        obj.NICKEL = lessMultipleOfcurrentMoney
      }
      i += 1
    } while (balance > 0 && i < 9)
    if (balance == 0) {
      const CID = Object.entries(obj)
      const msg = 'The current state of the Cash Register is '
      objectToReturn = { status: 'OPEN', change: CID }
      console.log(msg)
      const newObj = Object.entries(cidOject)
      console.log(newObj)
      return objectToReturn
    }
  }
}

const objectToReturne = checkCashRegister(3.26, 100, cid)
console.log(objectToReturne)
