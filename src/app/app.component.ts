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
    console.log(this.debtsArray);
    console.log(i);
  }

  addNewDebt() {
    let newDebt = new Debt("New Payment", 1000, 6.5, 50);
    this.debtsArray.unshift(newDebt);
  }

  parseDebts() {

  }


}
