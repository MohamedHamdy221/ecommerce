import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,FormsModule,RouterLink,SearchPipe,UpperCasePipe,LowerCasePipe,TitleCasePipe,CurrencyPipe,SlicePipe,DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {

 private readonly _ProductsService=inject(ProductsService);
 private readonly _CategoriesService=inject(CategoriesService);
 private readonly _CartService=inject(CartService)
 private readonly _ToastrService=inject(ToastrService)

  productList:IProduct[]=[]
  CategoriesList:ICategory[]=[]

  text:string="";
  getAllProductSub !: Subscription


  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true
  }

  customOptionsCta: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

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
