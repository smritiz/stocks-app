import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('StockService', () => {
  let httpTestingController: HttpTestingController;
  let service:  StockService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [StockService]
  }));
  beforeEach(() => {
    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(StockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getStocks() should fetch all available stocks', () => {
    const mockRespone = {
      stocks: [
        {
          title: 'Incedo',
          price: 500,
          quantity: 1000
        },
        {
          title: 'Infy',
          price: 300,
          quantity: 3000
        }
      ]
    };
    service.getStocks()
      .subscribe((response: any) => {
        expect(response.stocks.length).toBeGreaterThan(0);
      });
    const req = httpTestingController.expectOne('http://localhost:8080/stock');
    expect(req.request.method).toEqual('GET');
    req.flush(mockRespone);
  });
  it('#getStockByUser() should fetch stocks by userId', () => {
    const mockRespone = {
      stocks: [
        {
          title: 'Incedo',
          price: 500,
          quantity: 1000
        },
        {
          title: 'Infy',
          price: 300,
          quantity: 3000
        }
      ]
    };
    service.getStockByUser()
      .subscribe((response: any) => {
        expect(response.stocks.length).toBeGreaterThan(0);
      });
      const userId = localStorage.getItem('userId');
    const req = httpTestingController.expectOne('http://localhost:8080/userstocks/' + userId);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRespone);
  });

  it('#buyStock() user should be able buy selected stocks', () => {
    const mockRespone = {
      message: 'Purchase successful'
    };
    const stock = { _id: 'sfioi34234', title: 'title', price: 100, quantity: 200 };
    service.buyStock(stock, '12345')
      .subscribe((response: any) => {
        expect(response.message).toEqual('Purchase successful');
      });
    const req = httpTestingController.expectOne('http://localhost:8080/userstocks');
    expect(req.request.method).toEqual('POST');
    req.flush(mockRespone);
  });

  it('#sellStock() user should be able sell selected stocks', () => {
    const mockRespone = {
      message: 'Sold successfully'
    };
    const stock = { _id: 'sfioi34234', title: 'title', price: 100, quantity: 200 };
    service.sellStock(stock)
      .subscribe((response: any) => {
        expect(response.message).toEqual('Sold successfully');
      });
    const req = httpTestingController.expectOne('http://localhost:8080/userstocks/' + stock._id);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockRespone);
  });
});
