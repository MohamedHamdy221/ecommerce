import { ICart } from './../../core/interfaces/icart';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  
private readonly _CartService=inject(CartService);

cartDetails : ICart ={} as ICart;

ngOnInit(): void {
  this._CartService.getProductCart().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.cartDetails=res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

removeItem(id:string):void{
  this._CartService.deleteCartItem(id).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartDetails=res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

updateCount(id:string ,count:number):void{
if(count > 0){
  this._CartService.updateProductCart(id,count).subscribe({
    next:(res)=>{
      console.log(res)
      this.cartDetails=res.data
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}

clearItem():void{
  this._CartService.clearCart().subscribe({
    next:(res)=>{
      console.log(res)
      if(res.message == 'success'){
        this.cartDetails={}as ICart
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
