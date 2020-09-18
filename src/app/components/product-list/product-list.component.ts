import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId:number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;


  constructor(private productService: ProductService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listsProducts();
    });

  }

  listsProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }    
    else{

      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    this.productService.searchProducts(keyword).subscribe((response)=> {
      console.log('it has it')
      this.products = response;
      
    });
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCatId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);

    this.productService.getProductListPaginate(this.pageNumber -1,
      this.pageSize, this.currentCategoryId).subscribe( 
          this.processResult());
    // this.productService.getProductList(this.currentCategoryId).subscribe((response)=> {
    //   this.products = response;
    // });

  }
  processResult() {
    return response => {
      this.products = response._embedded.products;
      this.pageNumber = response.page.number + 1;
      this.pageSize = response.page.size;
      this.totalElements = response.page.totalElements;
    };
  }
}
