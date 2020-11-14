import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../modules/cart-item';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }

  addToCart(cartItem: CartItem) {
    let alreadyExist: boolean = false;
    let existingCItem: CartItem = undefined;


    

    if (this.cartItems.length > 0) { 

      existingCItem = this.cartItems.find(tempItem => tempItem.id === cartItem.id);
      alreadyExist = (existingCItem != undefined);
    }


      if(alreadyExist) {
        existingCItem.quantity++;

      }else {
        this.cartItems.push(cartItem)
      }
      
    this.computeCartTotals();
  }

  decrementQuantity(cartItem: CartItem){
    cartItem.quantity--;
    if(cartItem.quantity === 0 ) {
      this.remove(cartItem);
    } else{
      this.computeCartTotals();
    }
  }
  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === cartItem.id);
    if ( itemIndex > -1) {
      this.cartItems.splice(itemIndex,1);
      this.computeCartTotals();
    }


  }

  computeCartTotals(){
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let currentCartItem of this.cartItems) {
      totalPriceValue+= currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);


    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');

    for (let temp of this.cartItems){
      const subTotal = temp.quantity * temp.unitPrice;
    //  console.log(`el ide es= ${temp.id} el nombre es = ${temp.name} la cantidad es = ${temp.quantity} this is the unit price ${temp.unitPrice}`);
    }

    //console.log(`totalPrice: ${totalPriceValue.toFixed(2)} totalQuantity: ${totalQuantityValue}`);
    //console.log('----------')
    
  }

  
}
