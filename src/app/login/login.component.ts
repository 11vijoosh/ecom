import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData={
    email:null,
    password:null
  }
  constructor(private _auth:AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    //console.log(this.userData)
    this._auth.loginUser(this.userData)
      .subscribe(
        res => {
          console.log(res)
          this._auth.userId=res.id
          localStorage.setItem('userid',res.id)
          localStorage.setItem('token',res.token)
          this._router.navigate(['/products'])
        },
        err => console.log(err)
      )
  }

}
