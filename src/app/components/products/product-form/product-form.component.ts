import { Component, EventEmitter, Input, Output, effect, inject } from '@angular/core';
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
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() product: IProduct = {};
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>()
  public categoryService: CategoryService = inject(CategoryService)
  public categories: ICategory[] = []

  callEvent() {
    this.callParentEvent.emit(this.product);
  }
  ngOnInit() {
    this.loadCategory()
  }

  loadCategory() {
    this.categoryService.getAll()
    this.categories = this.categoryService.items$()
  }

}