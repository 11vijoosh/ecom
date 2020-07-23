import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderItems = [];

  constructor(private _authService: AuthService,
    private _router: Router,
    private _ordersService: OrdersService) { }

  ngOnInit(): void {
    this.load()
  }

  load() {
    // console.log('*******',this._authService.userId,'*********')
    // console.log(localStorage.getItem('userid'))
    this._ordersService.getOrderItems(localStorage.getItem('userid'))
      .subscribe(
        res => {
          this.orderItems = res
          console.log(this.orderItems)
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

}
