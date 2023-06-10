import { ProductService } from '../services/product.service';
import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: IProduct;
  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ){
    this.route.paramMap.subscribe((param) => {
      const id = String(param.get('id'));
      this.ProductService.getProductById(id).subscribe(
        (product) => {
          this.product = product;
      },
      (error) => console.log(error.message)
      );
  });
}
}
