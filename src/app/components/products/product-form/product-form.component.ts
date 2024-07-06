import { Component, Input, effect, inject } from '@angular/core';
import { IFeedBackMessage, IProduct, ICategory, IFeedbackStatus } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})

export class ProductFormComponent {
  @Input() title!: string;
  @Input() product: IProduct = {
    name: '',
    description: '',
    price: 0,
    quantityInStock: 0,
    category: undefined
  };

  @Input() action: string = 'add';
  service = inject(ProductService);
  feedbackMessage: IFeedBackMessage = { type: IFeedbackStatus.default, message: '' };

  public categoryList: ICategory[] = [];
  categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public currentCategory: ICategory = {
    name: '',
    description: ''
  };

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllSignal();
    this.categoryList = this.categoryService.categories$();
  }

  handleAction (form: NgForm) {
    if (form.invalid) {
      Object.keys(form.controls).forEach(controlName => {
        form.controls[controlName].markAsTouched();
      });
      return;
    } else {
      this.service[this.action === 'add' ? 'saveProductSignal' : 'updateProductSignal'](this.product).subscribe({
        next: () => {
          this.feedbackMessage.type = IFeedbackStatus.success;
          this.feedbackMessage.message = `Category successfully ${this.action === 'add' ? 'added' : 'updated'}`;
        },
        error: (error: any) => {
          this.feedbackMessage.type = IFeedbackStatus.error;
          this.feedbackMessage.message = error.message;
        }
      })
    }
  }
}
