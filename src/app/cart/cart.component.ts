import { Component, OnInit } from '@angular/core';

import { CartService } from "./cart.service";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProductDisplayService } from '../product-display/product-display.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems = [];
  constructor(private _cartService: CartService,
    private _authService: AuthService,
    private _router: Router,
    private _productDisplayService: ProductDisplayService,) { }



  ngOnInit(): void {
   // console.log('hiiiiiiiiiiiiiiii')
    this.load()
  }

 
  load() {
    //console.log('*******',this._authService.userId,'*********')
    console.log(localStorage.getItem('userid'))
    this._cartService.getCartItems(localStorage.getItem('userid'))
      .subscribe(
        res => {
          this.cartItems = res
          console.log(this.cartItems)
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  remove(itemId) {
    this._productDisplayService.removeFromCart(itemId)
      .subscribe(
        res => {
          alert('removed succesfully');
          this.load();
        },
        err => console.log('cart comp ts ', err)
      )
  }

  addToOrders(product) {
    // this._authService.userId
    if (localStorage.getItem('userid') === null) {
      this._router.navigate(['/login'])
    } else {
      
      let prod= {
        _id : product._id,
        productName : product.productName,
        price : product.price,
        quantity : 1,
        totalPrice : product.price,
        description : product.description,
        category : product.category
      }
      this.remove(product._id)
      this._cartService.addToOrders(prod)
        .subscribe(
          res => alert("added succesfully"),
          err => console.log(err)
        )

        
    }
    //console.log(product)
  }

}
