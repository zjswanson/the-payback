import { Component, OnInit } from '@angular/core';
import { Debt } from './debt.model';
import { DrawingService } from './drawing.service';
import { D3Service, D3, Selection } from 'd3-ng2-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DrawingService]
})
export class AppComponent {
  public d3: D3;
  public debtsArray: Debt[] = [];
  public balanceSchedule: {}[] = [];
  public totalPayments: number =0;
  public totalInterest: number =0;
  public totalYears: number =0;
  public totalMonths: number =0;
  public selection:any;

  constructor(private d3Service: D3Service, private draw: DrawingService) { //
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    let sampleDebt = new Debt("Sample Payment", 1000, 6.5, 50);
    this.debtsArray.push(sampleDebt);
    let sampleDebt2 = new Debt("Sample Payment 2", 2000, 4.5, 110);
    this.debtsArray.push(sampleDebt2);
    let sampleDebt3 = new Debt("Sample Payment 3", 800, 8, 100);
    this.debtsArray.push(sampleDebt3);
    this.selection = this.d3.select('#spiral').attr('width', 500).attr('height', 500).append('g').attr('transform', "translate(150,350)");


  }

  reDraw() {
      this.draw.drawCircleStack(this.selection, this.balanceSchedule);
  }

  saveDebt(debt, i) {
    this.debtsArray[i] = debt;
    console.log(this.debtsArray);
    this.parseDebts();
    this.parseTotals();
    this.draw.drawCircleStack(this.selection, this.balanceSchedule);
  }

  addNewDebt() {
    let newDebt = new Debt("New Payment", 1000, 6.5, 50);
    this.debtsArray.unshift(newDebt);
  }

  parseTotals() {
    this.totalYears = Math.floor(this.balanceSchedule.length/12);
    this.totalYears = Math.floor(this.balanceSchedule.length%12);
    this.totalPayments = +(this.totalPayments.toFixed(2));
    this.totalInterest = +(this.totalInterest.toFixed(2));
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
