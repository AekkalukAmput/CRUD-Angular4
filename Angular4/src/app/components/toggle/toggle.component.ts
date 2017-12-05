import { Component, Inject, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AccountComponent } from './components/account/account.component';

const headers = new Headers(
      {
          'Content-Type': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
      });
const options = new RequestOptions({headers: headers});

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {
  closeResult: string;
  @Input() data;

  private apiUrl = 'http://localhost:3000/account_number/update';

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

  onChangeBalnc(event: any) {
    this.data.balance = event.target.value;
    //console.log('balance '+this.data.balance);
  }

  submit() {
    this.http.post(this.apiUrl, this.data, headers: {'Content-Type': 'application/x-www-form-urlencoded'}).subscribe((data) => {
      console.log(data);
    });
    //reload page
    setTimeout(() => {
      location.reload();
    }, 500);
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
