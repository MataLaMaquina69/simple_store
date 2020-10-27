import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/modules/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get handle to the cart items
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe((response)=>{
      this.totalPrice = response;

    });

    this.cartService.totalQuantity.subscribe((response)=>{
      this.totalQuantity = response;

    });

    this.cartService.computeCartTotals();


  }
  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);

  }
  decrementQuantity(cartItem: CartItem){
    this.cartService.decrementQuantity(cartItem);
  }

  remove(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }

}
