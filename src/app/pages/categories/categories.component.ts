import { Component, inject, OnInit } from '@angular/core';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/category/category-from/category-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategory } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CategoryListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    CategoryFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  public categoryService: CategoryService = inject(CategoryService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public authService: AuthService =  inject(AuthService);
  public routeAuthorities: string[] =  [];

  ngOnInit(): void {
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  handleFormAction(item: ICategory) {
    this.categoryService.save(item);
  }

}