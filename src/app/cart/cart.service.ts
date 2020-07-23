import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartUrl="localhost:3000/user/cart";
  private _addToOrders = 'localhost:3000/user/addtoorders';
  constructor(private http:HttpClient,
    private _authService: AuthService) { }

  getCartItems(id) {
    return this.http.get<any>(this._cartUrl+'/'+id);
  }

  addToOrders(product){
    // this._authService.userId
    return this.http.put<any>(this._addToOrders+'/'+localStorage.getItem('userid'), product)
  }

  
}
