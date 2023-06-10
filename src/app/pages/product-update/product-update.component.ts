import { IProduct } from './../../interfaces/product';
import { Component } from '@angular/core';

import { ProductService } from '../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent {
  product!: IProduct;
  productForm!: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private ProductService: ProductService,
    private route: ActivatedRoute
  ){}

  ngOnInit():void {
    this.productForm = this.FormBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255),
        ],
      ],
      price: [0, [Validators.required, Validators.min(0)]],
      desc: '',
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if(id) {
        this.ProductService.getProductById(id).subscribe(
          (data: IProduct) => {
            this.product = data;
            this.productForm.patchValue({
              name: this.product.name,
              price: this.product.price,
              desc:this.product.desc,
            });
          },
          (error) => {
            console.log(error.message);
          }
        );
      }
    });
    
  }
  onHandleSubmit(): void {
    if(this.productForm.valid && this.product) {
      const updateProduct:IProduct = {
        ...this.product,
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        desc: this.productForm.value.desc,
    };
    this.ProductService.updateProduct(updateProduct).subscribe(
      (product) => {
        alert(`Product updated successfully:  ${product.name}`);
      },
      (error) => {
        alert(`Failed to update product: ${error.message}`);
      }
    );
  }
}
}
