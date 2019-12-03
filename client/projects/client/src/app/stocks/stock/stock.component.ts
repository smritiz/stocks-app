import { Component, OnInit, ViewChild } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import { AgGridAngular } from '@ag-grid-community/angular';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../service/error-handler.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

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
    this.stockService.addStocks(selectedData);
    if (selectedData.length <= 0) {
      return this.errorHandlerService.errorEmmitter.next({
        message: 'Select at least 1 stock to continue!',
        type: 'warning'
      });
    }
    this.router.navigate(['/stocks/buy-stocks']);
  }

  fetchStocks() {
    this.stockService.getStocks().subscribe((response: any) => {
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
      this.setWidth();
    });
  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  setWidth() {
    this.columnDefs.forEach(col => {
      // const w = (100 / this.columnDefs.length);
      col.width = 200;
    });
  }


}
