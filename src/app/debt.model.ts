export class Debt {
  public balanceSchedule:any[];
  public infinite:boolean;
  public totalPaid:number;
  public totalInterest:number;

  constructor(public debtName: string, public balance: number, public apr: number, public payment: number) {
    this.balanceSchedule = [];
    this.infinite = false;
    this.totalPaid = 0;
    this.totalInterest = 0;
  }

  calcDebtBalanceSchedule() {
    let monthRate = this.apr/1200;
    let currentBalance = this.balance;
    if (currentBalance*monthRate>= this.payment) {
      this.infinite = true;
      return;
    }
    let i=0;
    while (currentBalance>0) {
      this.totalInterest += currentBalance*(1*monthRate);
      currentBalance += currentBalance*(1*monthRate);
      if (this.payment > currentBalance) {
        let entry = {};
        this.totalPaid += currentBalance;
        this.balanceSchedule[i] = 0;
        currentBalance = 0;
      } else {
        this.totalPaid += this.payment;
        let entry = {};
        currentBalance -= this.payment;
        entry[this.debtName] = currentBalance;
        this.balanceSchedule[i] = entry;
      }
      i++;
    }

  }

}
