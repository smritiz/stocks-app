import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class StockService {

  endPoint = environment.apiEndPoint;
  selectedStocks = [];
  stocksToSell = [];
  stockEmitter = new BehaviorSubject(this.selectedStocks);
  sellStockEmitter = new BehaviorSubject(this.stocksToSell);
  constructor(private http: HttpClient) { 
  }

  addStocks(stocks: Array<any>) {
    this.selectedStocks = stocks;
    this.stockEmitter.next(this.selectedStocks);
  }
  updateStock(stock: any) {
    const index = this.selectedStocks.findIndex(st => st._id === stock._id);
    this.selectedStocks[index] = stock;
    this.stockEmitter.next(this.selectedStocks);
  }

  updateSellingStock (stocks: Array<any>) {
    this.stocksToSell = stocks;
    this.sellStockEmitter.next(this.stocksToSell);
  }

  updateSoldStock(stock: any) {
    console.log(this.stocksToSell);
    const index = this.stocksToSell.findIndex(st => st._id === stock._id);
    this.stocksToSell[index] = stock;
    this.sellStockEmitter.next(this.stocksToSell);
  }


  getStocks() {
    return this.http.get(this.endPoint + '/stock');
  }

  getStockByUser() {
    const userId = localStorage.getItem('userId');
    return this.http.get(this.endPoint + '/userstocks/' + userId);
  }

  buyStock(stock: any, userId: string) {
    const data = {
      ...stock,
      userId
    };
    return this.http.post(this.endPoint + '/userstocks', data);
  }

  sellStock(stock: any) {
    const data = {
      ...stock
    };
    return this.http.put(this.endPoint + '/userstocks/' + stock._id, data);
  }

}
