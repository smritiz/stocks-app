import { Component, OnInit, ViewChild } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AgGridAngular } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';
import { ErrorHandlerService } from '../../service/error-handler.service';

@Component({
  selector: 'app-user-stocks',
  templateUrl: './user-stocks.component.html',
  styleUrls: ['./user-stocks.component.css']
})
export class UserStocksComponent implements OnInit {


  columnDefs;
  rowData;
  rowSelection;
  modules = AllCommunityModules;
  @ViewChild('agGrid') agGrid: AgGridAngular;

  constructor(
    private router: Router,
    private stockService: StockService,
    private errorHandlerService: ErrorHandlerService
    ) {
    this.rowSelection = 'multiple';
   }

  ngOnInit() {
    this.fetchStocks();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    this.stockService.updateSellingStock(selectedData);
    if (selectedData.length <= 0) {
      return this.errorHandlerService.errorEmmitter.next({
        message: 'Select at least 1 stock to continue!',
        type: 'warning'
      });
    }
    this.router.navigate(['/stocks/sell-stocks']);
  }

  fetchStocks() {
    this.stockService.getStockByUser().subscribe((response: any) => {
      const headers = Object.keys(response.stocks[0]).filter(key => key !== '_id');
      this.columnDefs = headers.map(key => {
        return {
          headerName: key,
          field: key
        };
      });
      this.rowData = response.stocks;
      const col = this.columnDefs.find(r => r.headerName === 'title');
      col.filter = true;
      col.sortable = true;
      col.checkboxSelection = true;
      col.headerCheckboxSelection = true;
    });
  }

}
