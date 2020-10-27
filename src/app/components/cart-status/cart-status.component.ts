import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0.00;
  totalQuantity: number = 0.00;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus() {
    
    this.cartService.totalPrice.subscribe((response)=>{
      this.totalPrice = response;
    });
    this.cartService.totalQuantity.subscribe((response)=>{
      this.totalQuantity = response;
    });
  }
  

}
