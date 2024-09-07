import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CarouselModule,FormsModule,RouterLink,SearchPipe,UpperCasePipe,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  private readonly _ProductsService=inject(ProductsService);
  private readonly _CategoriesService=inject(CategoriesService);
 private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
 
   productList:IProduct[]=[]
   CategoriesList:ICategory[]=[]
 
   text:string="";
   getAllProductSub !: Subscription
 
 
 ngOnInit(): void {
 
   this._CategoriesService.getAllCategories().subscribe({
     next:(res)=>{
       console.log(res.data);
 
       this.CategoriesList=res.data;
 
     },
     error:(err)=>{
       console.log(err)
 
     }
 
 
   })
 
  this.getAllProductSub = this._ProductsService.getAllProduct().subscribe({
     next:(res)=>{
       console.log(res.data);
       this.productList=res.data;
     },
     error:(err)=>{
       console.log(err)  }
    })
 
  }
  ngOnDestroy(): void {
    this.getAllProductSub?.unsubscribe()
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
