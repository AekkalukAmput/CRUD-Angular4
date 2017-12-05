import { Component, OnInit, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


const headers = new Headers(
      {
          'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
      });
const options = new RequestOptions({headers: headers});

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent {
  closeResult: string;
  data = {
    account_number : '',
    branch_name : '',
    balance : ''
  };

  private apiUrl = 'http://localhost:3000/account_insert';

  constructor(private modalService: NgbModal, @Inject(Http)  private http:Http) {}

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onChangeBrNm(event: any) {
    this.data.branch_name = event.target.value;
    //console.log('branchname '+this.data.branch_name);
  }
  onChangeAccNum(event: any) {
    this.data.account_number = event.target.value;
    //console.log('account number '+this.data.account_number);
  }
  onChangeBalnc(event: any) {
    this.data.balance = event.target.value;
    //console.log('balance '+this.data.balance);
  }
  onSubmit() {
    this.http.post(this.apiUrl, this.data, headers: {'Content-Type': 'application/x-www-form-urlencoded'}).subscribe((data) => {
      console.log(data);
    });
    //reload page
    setTimeout(() => {
      location.reload();
    },500);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
