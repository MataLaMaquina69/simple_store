import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/modules/country';
import { State } from 'src/app/modules/state';
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

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder : FormBuilder, private storeService: StoreFormService) { }

  ngOnInit(): void {
    this.checkoutFormgroup = this.formBuilder.group({
       customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
        lastName:new FormControl('',[Validators.required, Validators.minLength(2)]),
        email:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')])
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
    //console.log("start month: " + startMonth);

    this.storeService.getCreditCardMonths(startMonth).subscribe((response)=>{
      console.log("Ret rieved credit card months: " + JSON.stringify(response));
      this.creditCardMonths = response;
      
    });
    this.storeService.getCreditCardYears().subscribe((response)=>{
      //console.log("Ret rieved credit card years: " + JSON.stringify(response));
      this.creditCardYears = response;
    })

    this.storeService.getCountries().subscribe((response)=>{
      //console.log("Countries dataa" + JSON.stringify(response));
      this.countries = response;
    })
  }
  onSubmit(): void {
    console.log('Handling the ');

    if (this.checkoutFormgroup.invalid){
      this.checkoutFormgroup.markAllAsTouched();
    }
    console.log(this.checkoutFormgroup.get('customer').value);
    console.log("the shipping address is " +this.checkoutFormgroup.get('shippingAddress').value.country.name);
    console.log(this.checkoutFormgroup.get('shippingAddress').value.state.name);

  }
  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormgroup.controls.billingAddress.setValue
      (
        this.checkoutFormgroup.controls.shippingAddress.value
        );
        this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormgroup.controls.billingAddress.reset();

      this.billingAddressStates = [];
    }

  }

  get firstName() {return this.checkoutFormgroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormgroup.get('customer.lastName');}
  get email() {return this.checkoutFormgroup.get('customer.email');}

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

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormgroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;
    const countryName =  formGroup.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country code: ${countryName}`);


    this.storeService.getStates(countryCode).subscribe((response)=>{
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = response;

      } else{
        this.billingAddressStates = response;
      }

      formGroup.get('state').setValue(response[0]);
    })
  }

}
