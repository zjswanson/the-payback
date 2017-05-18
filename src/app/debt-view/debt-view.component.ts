import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() public debt:Debt;
  @Output() sendDebt: EventEmitter<any> = new EventEmitter();
  public d3: D3;
  public showError = false;

  constructor(private d3Service: D3Service, private finance: FinanceService, private draw: DrawingService) { //
    this.d3 = d3Service.getD3();
  }

  ngOnInit() {
  }

  saveDebt(debt: Debt) {
    this.showError = false;
    let newDebt = new Debt(
      this.debt.debtName,
      this.debt.balance,
      this.debt.apr,
      this.debt.payment
    );
    newDebt.calcDebtBalanceSchedule();
    if (newDebt.infinite) {
      this.showError = true;
      return;
    } else {
      this.debt = newDebt;
      this.sendDebt.emit(this.debt);
    }
  }


}
