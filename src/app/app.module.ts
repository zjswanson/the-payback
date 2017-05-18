import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { D3Service } from 'd3-ng2-service';
import { FinanceService } from './finance.service';

import { AppComponent } from './app.component';
import { StackTestComponent } from './stack-test/stack-test.component';
import { DebtViewComponent } from './debt-view/debt-view.component';

@NgModule({
  declarations: [
    AppComponent,
    StackTestComponent,
    DebtViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [D3Service, FinanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
