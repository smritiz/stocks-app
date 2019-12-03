import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { UserStocksComponent } from './user-stocks/user-stocks.component';
import { BuyStocksComponent } from './buy-stocks/buy-stocks.component';
import { SellStocksComponent } from './sell-stocks/sell-stocks.component';
import { AuthGuard } from '../service/auth.guard';

const routes: Routes = [
  {
    path: 'grid',
    component: StockComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'my-stocks',
    component: UserStocksComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'buy-stocks',
    component: BuyStocksComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'sell-stocks',
    component: SellStocksComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'grid',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StocksRoutingModule { }
