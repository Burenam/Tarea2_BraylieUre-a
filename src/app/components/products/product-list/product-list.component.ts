import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { IProduct, ICategory } from '../../../interfaces';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CategoryFormComponent } from '../../category/category-from/category-form.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ModalComponent,
    ProductFormComponent,
    CategoryFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [DatePipe]
})
export class ProductListComponent implements OnChanges{

  @Input() itemList: IProduct[] = [];
  @Input() areActionsAvailable: boolean = true;
  public selectedItem: IProduct = {};
  public productService: ProductService = inject(ProductService);
  constructor(private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
    if (changes['itemList']) {
      console.log('itemList', this.itemList);
    }
  }

  showDetailModal(item: IProduct, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: IProduct) {
    this.productService.update(item);
  }

  deleteProduct(item: IProduct) {
    this.productService.delete(item);
  }

}
