import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../../resuableComponent/alert/alert.component';
import { Customer } from '../../../model/class/Customer';
import { IUser } from '../../../model/interface/IUser';
@Component({
  selector: 'app-get-api',
  standalone: true,
  imports: [AlertComponent],
  templateUrl: './get-api.component.html',
  styleUrl: './get-api.component.css'
})
export class GetAPIComponent {

  userList: IUser [] = [];
  customerList: Customer [] = [];
  alertMsg : string = ''

  constructor(private http: HttpClient) {
    this.getAllUser();
  } 

  changeMSg() {
    this.alertMsg = 'Hola'
  }

  getAllUser() {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((result:any)=>{
      this.userList = result;
    })
  }

  getAllCustomer() {
    this.http.get("https://projectapi.gerasim.in/api/PropertyBookingController/GetAllCustomer").subscribe((res:any)=>{
      this.customerList =  res.data;
    }, ()=>{
    })
  }



}
