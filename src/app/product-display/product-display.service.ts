import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";


@Injectable({
  providedIn: 'root'
})
export class ProductDisplayService {

  private _productsUrl = '/products/products';
  private _addToCart = '/user/addtocart';
  private _removeFromCart= '/user/removefromcart';
  constructor(private http:HttpClient,
    private _authService: AuthService) { }

  getProducts(category){
    return this.http.get<any>(this._productsUrl+'/'+category);
  }


  addToCart(product){
    // this._authService.userId
    return this.http.put<any>(this._addToCart+'/'+localStorage.getItem('userid'), product)
  }

  removeFromCart(itemId){
    //alert(this._removeFromCart+'/'+this._authService.userId+'/'+itemId)
    // this._authService.userId
    return this.http.delete<any>(this._removeFromCart+'/'+localStorage.getItem('userid')+'/'+itemId)
  }
  
}
