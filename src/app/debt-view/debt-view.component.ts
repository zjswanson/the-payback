import { Component, OnInit } from '@angular/core';
import { Debt } from './../debt.model';
import { D3Service, D3, Selection } from 'd3-ng2-service';
import { FinanceService } from './../finance.service';
import { DrawingService } from './../drawing.service';


@Component({
  selector: 'app-debt-view',
  templateUrl: './debt-view.component.html',
  styleUrls: ['./debt-view.component.css'],
  providers: [FinanceService, DrawingService]
})
export class DebtViewComponent implements OnInit {

  public debt:Debt;
  public selection;
  public d3: D3;
  public showError = false;

  constructor(private d3Service: D3Service, private finance: FinanceService, private draw: DrawingService) { //
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
    this.debt = new Debt('Sample Debt', 1000, 6.5, 50);
    this.selection =
    this.d3.selectAll('#draw-here')
      .attr('width', 500)
      .attr('height', 500)
      .append('g')
      .attr('transform', "translate(250,250)");
  }

  saveDebt() {
    this.showError = false;
    let newDebt = new Debt(
      this.debt.debtName,
      this.debt.balance,
      this.debt.apr,
      this.debt.payment
    );
    console.log(newDebt);
    newDebt.calcDebtBalanceSchedule();
    if (newDebt.infinite) {
      this.showError = true;
      return;
    }
    this.debt = newDebt;
    this.draw.drawCircle(this.selection,this.debt);

  }

  logMe(){
    console.log(this.debt);
  }

}
