import { Component, effect, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../interfaces';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryFormComponent } from '../category-from/category-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ModalComponent,
    CategoryFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [DatePipe]
})
export class CategoryListComponent implements OnChanges{
  @Input() itemList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;
  public categoryService: CategoryService = inject(CategoryService);

  public selectedItem: ICategory = {
    name: '',
    description: ''
  };

  constructor(private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
    if (changes['itemList']) {
      console.log('itemList', this.itemList);
    }
  }
  
  showDetailModal(item: ICategory, modal: any) {
    this.selectedItem = {...item}
    modal.show();
  }

  handleFormAction(item: ICategory) {
    this.categoryService.update(item);
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }
}