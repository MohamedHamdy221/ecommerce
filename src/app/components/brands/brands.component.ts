import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
 private readonly _BrandsService=inject(BrandsService);

 
brandDetails:IBrands[]=[]

ngOnInit():void{
  this._BrandsService.getBrands().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.brandDetails=res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}
