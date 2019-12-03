import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellStocksComponent } from './sell-stocks.component';
import { StockService } from '../stock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SellStocksComponent', () => {
  let component: SellStocksComponent;
  let fixture: ComponentFixture<SellStocksComponent>;
  let stockService: StockService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellStocksComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [StockService]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellStocksComponent);
    component = fixture.componentInstance;
    stockService = TestBed.get(StockService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
