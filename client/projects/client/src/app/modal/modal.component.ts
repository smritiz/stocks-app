import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../service/error-handler.service';
import { CustomError } from '../models/error';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  error: { message: string, type: string };
  constructor(private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
    this.errorHandlerService.errorEmmitter.subscribe((value: CustomError) => {
      this.error = value;
      this.showModal();
    })
  }
  showModal():void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    //do something here
    this.hideModal();
  }
  hideModal():void {
    document.getElementById('close-modal').click();
  }

}
