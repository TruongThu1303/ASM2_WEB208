import { Component } from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
    products: IProduct[] = [ ];
    constructor(private productService: ProductService){
      this.productService.getProducts().subscribe(
        data => this.products = data,
        (error) => console.log(error.message)
      );
    }

    delete(id:string){
      const confirm = window.confirm('Are you sure you want to delete this product')
      if(confirm){
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter(product => product.id !== id)
        })
      }
    }
}
