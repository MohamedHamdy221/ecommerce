import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deteils',
  standalone: true,
  imports: [],
  templateUrl: './deteils.component.html',
  styleUrl: './deteils.component.scss'
})
export class DetailsComponent implements OnInit {

 private readonly _ActivatedRoute=inject(ActivatedRoute);
 private readonly _ProductsService=inject(ProductsService);
 private readonly _CartService=inject(CartService);
 private readonly _ToastrService=inject(ToastrService);


  detailsList:IProduct |null=null

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
    let idProduct=  p .get('id')

      this._ProductsService.getSpecificProduct(idProduct).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.detailsList =res.data;

        },
        error:(err)=>{
          console.log(err)
        }
      })


    }
  })
}

addCart(id:string):void{
  this._CartService.addProjectToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success(res.message)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}
