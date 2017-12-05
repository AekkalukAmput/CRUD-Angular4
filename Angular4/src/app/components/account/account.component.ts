import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  title = 'app';
  private apiUrl = 'http://localhost:3000/getaccount';
  data

  constructor(private http: Http) {
    this.getContacts();
    this.getData();
  }

  getData() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json())
  }

  getContacts() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data
    })
  }

}
