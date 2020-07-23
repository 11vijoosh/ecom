import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userData={name: null,
  email:null,
  password: null,
  phone: null,
  address:{
      street:null,
      city: null,
      state: null,
      pincode: null,
      country: null
  }}
  //userModel = new User('','','a',9,{'street':'','city':'','state':'','pincode':,'country':'kjhb'});
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    //console.log(this.userModel);
    this._auth.registerUser(this.userData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token',res.token)
          localStorage.setItem('userid',res.id)
          this._router.navigate(['/products'])
        },
        err => console.log(err)
      )
  }

}
