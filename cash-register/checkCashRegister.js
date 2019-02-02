/**
 * For more chaos: https://github.com/SEBPort0/fcc-projects
 * 
 * @SEBPort0
 */

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let cashRegister = {status: "", change: []};
  let funds = cid.map(n => n[1]).reduce((a, b) => a + b);
  let currency = {"PENNY": 0.01, "NICKEL": 0.05, 
                  "DIME": 0.1, "QUARTER": 0.25,
                  "ONE": 1, "FIVE": 5, 
                  "TEN": 10, "TWENTY": 20, 
                  "ONE HUNDRED": 100};

  if(funds < change) {
    cashRegister.status = "INSUFFICIENT_FUNDS";
    cashRegister.change = [];
  }
  if(funds === change) {
    cashRegister.status = "CLOSED";
    cashRegister.change = cid;
  }
  if(funds > change) {
    // we go through cid from the end to the start.
    for(let i = cid.length - 1; i >= 0; i--) {
      // easy to remember names.
      let cidMoney = cid[i][1];
      let cidCurrency = cid[i][0];
      let units = 0;
      while(currency[cidCurrency] <= change && cidMoney > 0) {
        change -= currency[cidCurrency];
        cidMoney -= currency[cidCurrency];
        units += 1;
        // to round or to round.
        change = Math.round(change * 100) / 100;
      }
      if(units > 0)
        cashRegister.change.push([cidCurrency, units * currency  [cidCurrency]]);
    }
    if(cashRegister.change.length < 1 || change > 0) {
      cashRegister.status = "INSUFFICIENT_FUNDS";
      cashRegister.change = [];
    }
    else {
    cashRegister.status = "OPEN";
    }
  
  }
  return cashRegister;
    
}