import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StoreFormService } from '../../services/store-form.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormgroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder : FormBuilder, private storeService: StoreFormService) { }

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

    const startMonth: number = new Date().getMonth() + 1;
    console.log("start month: " + startMonth);

    this.storeService.getCreditCardMonths(startMonth).subscribe((response)=>{
      console.log("Ret rieved credit card months: " + JSON.stringify(response));
      this.creditCardMonths = response;
      
    });
    this.storeService.getCreditCardYears().subscribe((response)=>{
      console.log("Ret rieved credit card years: " + JSON.stringify(response));
      this.creditCardYears = response;
    })
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

  handleMonthsNYears(){
    const creditCardFormGroup = this.checkoutFormgroup.get('creditCard')
    const currentYear: number = new Date().getFullYear();

    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else{
      startMonth = 1;
    }

    this.storeService.getCreditCardMonths(startMonth).subscribe((response)=>{
      console.log("Retrieven credit carad months: " + JSON.stringify(response));
      this.creditCardMonths = response;
    })
  }

}
