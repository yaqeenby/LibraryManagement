import { Component } from '@angular/core';
import { Category } from '../../models/category.model';
import { ErrorCode } from '../../../../enums/errorCode.enum';
import { CategoryService } from '../../services/category.service';
import { ToasterService } from '../../../../services/toaster.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../components/add-category/add-category.component';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  standalone: false
})
export class CategoriesListComponent {
  categories: Category[] = [];
  categoriesTitles: string[] = [];
  displayedColumns: string[] = ['id', 'name'];

  private destroy$ = new Subject<void>();

  constructor(private _categoryService: CategoryService,
    private _dialog: MatDialog,
    private _router: Router,
    private _toasterService: ToasterService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(search: string = '') {
    this._categoryService.getCategories(search)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.errorCode === ErrorCode.Success) {
            this.categories = data.data;
            this.categoriesTitles = data.data.map(cat => cat.name);
          } else {
            this._toasterService.success('Error fetching categories', data.message);
          }
        },
        error: (err) => this._toasterService.success('Error fetching categories', err.message)
      });
  }

  onSearch(term: any) {
    this.loadCategories(term);
  }

  onSelect(selected: any) {
    if (selected && selected.trim()) {
      this.loadCategories(selected);
    }
  }

  openEditDialog(category: Category | null = null) {
    const ref = this._dialog.open(AddCategoryComponent, {
      width: '500px',
      data: category
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  openDeleteConfirmDialog(category: Category) {
    this._toasterService.confirmBox('Are you sure?', "When you delete this category, all books linked to it will remain, but their association with this category will be removed. Are you sure you want to proceed?").then((result) => {
      if (result.value) {
        this.deleteCategory(category);
      }
    });
  }

  deleteCategory(category: Category) {
    this._categoryService.deleteCategory(category.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.errorCode === ErrorCode.Success) {
            this.loadCategories();
            this._toasterService.success('Deleted Successfully!');
          } else {
            this._toasterService.success('Error', data.message);
          }
        },
        error: (err) => this._toasterService.success('Error', err.message)
      });
  }

  navigateToCategory(cat: Category) {
    this._router.navigate([`/categories/details/${cat.id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
