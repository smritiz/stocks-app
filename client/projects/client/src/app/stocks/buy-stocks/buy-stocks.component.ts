import { Component, OnInit, OnDestroy } from '@angular/core';
import { StockService } from '../stock.service';
import { Subscription } from 'rxjs';
import { ErrorHandlerService } from '../../service/error-handler.service';

@Component({
  selector: 'app-buy-stocks',
  templateUrl: './buy-stocks.component.html',
  styleUrls: ['./buy-stocks.component.css']
})
export class BuyStocksComponent implements OnInit, OnDestroy {

  stocks: Array<any>;
  stockSubscriber: Subscription;
  constructor(private stockService: StockService,
    private errorHandlerService: ErrorHandlerService
    ) {}

  ngOnInit() {
     this.stockSubscriber = this.stockService.stockEmitter.subscribe((data: any) => {
      this.stocks = data;
    });
  }

  buyStock(stock: any, qty: string) {
    const quantity = parseInt(qty, 10);
    if (stock.quantity < quantity) {
      return this.errorHandlerService.errorEmmitter.next({
        message: 'Buying quantity should be less than available quantity!',
        type: 'Error'
      });
    }
    const data = { ...stock, quantity: quantity };
    const userId = localStorage.getItem('userId');
    this.stockService.buyStock(data, userId).subscribe((response: any) => {
      this.stockService.updateStock(response.stock);
    });
  }

  ngOnDestroy() {
    this.stockSubscriber.unsubscribe();
  }

}
