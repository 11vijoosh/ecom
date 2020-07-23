import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { ProductDisplayService } from './product-display.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  @Input() product: any;
  products = [];
  cartItems=[];
  constructor(private _productService: ProductDisplayService,
    private _authService: AuthService,
    private _router: Router,
    private _cartService: CartService) { }

  ngOnInit(): void {
    //this.loadDetails(); 
  }

  ngOnChanges(): void {
    this.loadDetails();

  }

  loadDetails() {
    this._productService.getProducts(this.product)
      .subscribe(
        res => {
        this.products = res;
          //console.log(res);
        },
        err => console.log(err)
      )
  }

  addToCart(product) {
    // this._authService.userId
    if (localStorage.getItem('userid') === null) {
      this._router.navigate(['/login'])
    } else {
      let flag=0;
      let prod= {
        _id : product._id,
        productName : product.productName,
        price : product.price,
        quantity : 1,
        totalPrice : product.price,
        description : product.description,
        category : product.category
      }

      // console.log('prod',prod)

      // this._authService.userId
      this._cartService.getCartItems(localStorage.getItem('userid'))
      .subscribe(
        res => {
          this.cartItems = res 
          // console.log(this.cartItems)
          for(let item in this.cartItems)
          {
            
            // console.log('first this.cartItems[item]._id===',this.cartItems[item]._id)
            // console.log('second prod._id===',prod._id)
            if(this.cartItems[item]._id === prod._id)
            {
              flag=1;
            }
          }
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )

      
        
      

      
        if(flag == 1){
              alert('already added to cart')
        }
        else{
            this._productService.addToCart(prod)
              .subscribe(
                res => alert("added succesfully"),
                err => console.log(err)
              )
        }
    }
    //console.log(product)
  }

}
