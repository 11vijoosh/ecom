import { Component, OnInit } from '@angular/core';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  category : any[];
  //isDisplay: any = false;
  categoryName: any = "watches";

  constructor() { }

  ngOnInit(): void {
    this.category = ['watches','mobiles','laptops'];
  }
  
  openDetail(event)
  {
    //this.isDisplay = true;
    this.categoryName = event.target.text;
    //console.log(event);
  }

 

}
