import { Component, OnInit } from '@angular/core';
import { Debt } from './debt.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public debtsArray: Debt[] = [];
  public balanceSchedule: {}[] = [];
  public totalPayments: number =0;
  public totalInterest: number =0;


  ngOnInit() {
    let sampleDebt = new Debt("Sample Payment", 1000, 6.5, 50);
    this.debtsArray.push(sampleDebt);
    let sampleDebt2 = new Debt("Sample Payment 2", 2000, 4.5, 110);
    this.debtsArray.push(sampleDebt2);
    let sampleDebt3 = new Debt("Sample Payment 3", 800, 8, 100);
    this.debtsArray.push(sampleDebt3);
    console.log(this.debtsArray);


  }

  saveDebt(debt, i) {
    this.debtsArray[i] = debt;
    this.parseDebts();
    console.log(this.balanceSchedule);
    console.log(this.totalInterest);
    console.log(this.totalPayments);
    // call drawing method here
  }

  addNewDebt() {
    let newDebt = new Debt("New Payment", 1000, 6.5, 50);
    this.debtsArray.unshift(newDebt);
  }

  parseDebts() {
    //each iteration, create object, give a prop for each debt equal to its payment with name of debt.  Stop iterating when all payments are 0.
    this.balanceSchedule = [];
    this.totalInterest =0;
    this.totalPayments =0;
    this.debtsArray.forEach((debt)=> {
      this.totalInterest += debt.totalInterest;
      this.totalPayments += debt.totalPaid;
    });
    let monthtotal = 1;
    let i = 0;

    while (monthtotal>0) {
      monthtotal = 0;
      this.balanceSchedule[i] = {};
      this.debtsArray.forEach((debt)=> {
        this.balanceSchedule[i][debt.debtName] = 0;
        if(debt.balanceSchedule[i] && debt.balanceSchedule[i][debt.debtName]) {
          this.balanceSchedule[i][debt.debtName] = debt.balanceSchedule[i][debt.debtName];
          monthtotal += debt.balanceSchedule[i][debt.debtName];
        }
      });
      i++;
    }


  }


}
