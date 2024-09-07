import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { ICategory } from '../../core/interfaces/icategory';
import { CategoriesService } from '../../core/services/categories.service';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CarouselModule ,FormsModule,RouterLink,SearchPipe,UpperCasePipe,CurrencyPipe,LowerCasePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  
 private readonly _CategoriesService=inject(CategoriesService);

  CategoriesList:ICategory[]=[]

  text:string="";
 
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
 }
}