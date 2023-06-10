import { Component, OnInit} from '@angular/core';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from '../services/product.service';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit{
  productForm = this.formBuilder.group ({
      name: ['', [   Validators.required,
        Validators.minLength(4),
        Validators.maxLength(255),]],
      price: [0],
      desc: ['', Validators.required, Validators.minLength(20)],
    });
    constructor(
      private formBuilder: UntypedFormBuilder,
      private productService: ProductService
    ) {}
    onHandleSubmit(){
      const product: IProduct = {
        id: '',
        name: this.productForm.value.name || '',
        price: this.productForm.value.price || 0,
        desc: this.productForm.value.desc || '',
      };

      this.productService.addProduct(product).subscribe((product) => {
          alert(`Product added successfully: ${product.name}`);
      });
    }
    ngOnInit(): void {
      // Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
'use strict';

// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation');

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach((form) => {
  form.addEventListener('submit', (event: any) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});
})();
  }
}
