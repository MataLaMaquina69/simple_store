import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/modules/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe((response)=>{
      console.log('Product categories= ' + JSON.stringify(response));
      this.productCategories = response;
    });
  }
}
