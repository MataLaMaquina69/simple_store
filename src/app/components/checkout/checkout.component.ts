import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormgroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormgroup = this.formBuilder.group({
       customer: this.formBuilder.group({
        firstName: [''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],
      }),
      billingAddress: this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],
      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:[''],
      })
    });
  }
  onSubmit():void{
    console.log('Handling the ');
    console.log(this.checkoutFormgroup.get('customer').value);

  }
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormgroup.controls.billingAddress.setValue
      (
        this.checkoutFormgroup.controls.shippingAddress.value
        );
    } else {
      this.checkoutFormgroup.controls.billingAddress.reset();
    }

  }

}
