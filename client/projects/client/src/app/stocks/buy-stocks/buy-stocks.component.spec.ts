import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStocksComponent } from './buy-stocks.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StockService } from '../stock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BuyStocksComponent', () => {
  let component: BuyStocksComponent;
  let fixture: ComponentFixture<BuyStocksComponent>;
  let stockService: StockService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyStocksComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [ StockService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
