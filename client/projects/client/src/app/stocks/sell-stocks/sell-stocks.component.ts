import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockService } from '../stock.service';
import { ErrorHandlerService } from '../../service/error-handler.service';

@Component({
  selector: 'app-sell-stocks',
  templateUrl: './sell-stocks.component.html',
  styleUrls: ['./sell-stocks.component.css']
})
export class SellStocksComponent implements OnInit, OnDestroy {

  stocks: Array<any> = [];
  stockSubscriber: Subscription;
  constructor(private stockService: StockService,
    private errorHandlerService: ErrorHandlerService
    ) {}

  ngOnInit() {
     this.stockSubscriber = this.stockService.sellStockEmitter.subscribe((data: any) => {
      this.stocks = data;
    });
  }

  sellStock(stock: any, qty: string) {
    const quantity = parseInt(qty, 10);
    if (stock.quantity < quantity) {
      return this.errorHandlerService.errorEmmitter.next({
        message: 'Selling quantity should be less than total quantity!',
        type: 'Error'
      });
    }
    const data = { ...stock, quantity: quantity };
    const userId = localStorage.getItem('userId');
    this.stockService.sellStock(data).subscribe((response: any) => {
      this.stockService.updateSoldStock(response.userstock);
    });
  }

  ngOnDestroy() {
    this.stockSubscriber.unsubscribe();
  }

}
