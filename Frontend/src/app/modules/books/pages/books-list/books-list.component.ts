import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ErrorCode } from '../../../../enums/errorCode.enum';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../categories/models/category.model';
import { ToasterService } from '../../../../services/toaster.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
  standalone: false
})
export class BooksListComponent {
  books: Book[] = [];
  bookTitles: string[] = [];
  displayedColumns: string[] = ['id', 'title', 'author', 'categories', 'action'];

  categories: Category[] = [];

  private destroy$ = new Subject<void>();
  constructor(
    private _bookService: BookService,
    private _categoryService: CategoryService,
    private _toasterService: ToasterService) { }

  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
  }

  loadBooks(search: string = '') {
    this._bookService.getBooks(search)
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

  loadCategories() {
    this._categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.errorCode === ErrorCode.Success) {
            this.categories = data.data;
          } else {
            this._toasterService.error('Error fetching categories', data.message);
          }
        },
        error: (err) => this._toasterService.error('Error fetching categories', err.message)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
