import { Injectable } from '@angular/core';

@Injectable()
export class FinanceService {

  constructor() { }


  randomDebtStack() {
    let numDebts:number = Math.floor(Math.random()*7)+3;
    let numPayments:number = Math.floor(Math.random()*10)+4;
    let paymentArray = [];
    let object = {};
    for (var i=1;i<=numDebts;i++)  {
      object['debt'+i] = Math.floor(Math.random()*5)+3;
    }
    for (var i=0;i<numPayments;i++) {
      paymentArray[i] = {};
      let total = 0;
      for (var j =1;j<=numDebts;j++) {
        paymentArray[i]['debt'+j] = object['debt'+j]-i;
       if (paymentArray[i]['debt'+j] <0) {paymentArray[i]['debt'+j] =0;}
       total += paymentArray[i]['debt'+j];
      }
      if (!total) {break;}
    }
    return paymentArray;
  }
}
