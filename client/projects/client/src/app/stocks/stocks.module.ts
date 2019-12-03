import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StocksRoutingModule } from './stocks-routing.module';
import { StockComponent } from './stock/stock.component';
import { BuyStocksComponent } from './buy-stocks/buy-stocks.component';
import { UserStocksComponent } from './user-stocks/user-stocks.component';
import { SellStocksComponent } from './sell-stocks/sell-stocks.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from '@ag-grid-community/angular';
import { StockService } from './stock.service';
import { AuthInterceptor } from '../service/interceptor';

@NgModule({
  declarations: [
    StockComponent,
    BuyStocksComponent,
    UserStocksComponent,
    SellStocksComponent
  ],
  imports: [
    CommonModule,
    StocksRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [ StockService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ]
})
export class StocksModule { }
