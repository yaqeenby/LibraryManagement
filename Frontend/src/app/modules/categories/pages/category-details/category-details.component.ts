import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorCode } from '../../../../enums/errorCode.enum';
import { ToasterService } from '../../../../services/toaster.service';
import { BookService } from '../../../books/services/book.service';
import { Book } from '../../../books/models/book.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
  standalone: false
})
export class CategoryDetailsComponent implements OnInit {
  category: Category | null = null;
  categoryId: number | null = null;
  books: Book[] = [];
  bookTitles: string[] = [];

  private destroy$ = new Subject<void>();

  constructor(private _categoryService: CategoryService,
    private _bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toasterService: ToasterService) {

  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.categoryId = +params['id'];
        this.getCategory();
        this.loadBooksByCategory('');
      }
    })
  }

  getCategory() {
    if (!this.categoryId) return;

    this._categoryService.getCategoryById(this.categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.errorCode === ErrorCode.Success) {
            this.category = data.data;
          } else {
            this._toasterService.error('Error fetching categories', data.message);
          }
        },
        error: (err) => this._toasterService.error('Error fetching categories', err.message)
      });

  }

  loadBooksByCategory(search: any) {
    this._bookService.getBooks(search, this.categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.errorCode === ErrorCode.Success) {
            this.books = data.data;
            this.bookTitles = data.data.map(book => book.title);
          } else {
            this._toasterService.error('Error fetching books', data.message);
          }
        },
        error: (err) => this._toasterService.error('Error fetching books', err.message)
      });
  }

  back() {
    this._router.navigate(['/categories/list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
