import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IFeedBackMessage, ICategory, IFeedbackStatus} from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent  {
  @Input() category: ICategory =  {
    name: '',
    description: ''
  };
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<ICategory> = new EventEmitter<ICategory>()

  callEvent() {
    this.callParentEvent.emit(this.category);
  }
}
