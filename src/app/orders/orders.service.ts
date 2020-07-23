import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private _ordersUrl="https://ecommdemoo.herokuapp.com//user/orders";

  constructor(private http:HttpClient) { }


  getOrderItems(id) {
    return this.http.get<any>(this._ordersUrl+'/'+id);
  }
}
