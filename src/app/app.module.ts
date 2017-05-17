import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { D3Service } from 'd3-ng2-service';
import { FinanceService } from './finance.service';

import { AppComponent } from './app.component';
import { StackTestComponent } from './stack-test/stack-test.component';

@NgModule({
  declarations: [
    AppComponent,
    StackTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [D3Service, FinanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
