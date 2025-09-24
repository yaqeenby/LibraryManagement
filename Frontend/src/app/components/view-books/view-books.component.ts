import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../modules/books/models/book.model';
import { ErrorCode } from '../../enums/errorCode.enum';
import { BookService } from '../../modules/books/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../modules/categories/models/category.model';
import { AddBookComponent } from '../add-book/add-book.component';
import { ToasterService } from '../../services/toaster.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.scss',
  standalone: false
})
export class ViewBooksComponent {
  @Input() title: string = '';
  @Input() desc: string = '';
  @Input() categoryId: number | null = null;
  @Input() viewEdit: boolean = true;
  @Input() books: Book[] = [];
  @Input() bookTitles: string[] = [];
  @Input() categories: Category[] = [];

  displayedColumns: string[] = ['id', 'title', 'author', 'categories', 'action'];

  @Output() reloadBooks: EventEmitter<string> = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  constructor(
    private _bookService: BookService,
    private _dialog: MatDialog,
    private _toasterService: ToasterService) { }

  ngOnInit(): void {
  }

  onSearch(term: string) {
    this.reloadBooks.emit(term);
  }

  onSelect(selected: any) {
    if (selected && selected.trim()) {
      this.reloadBooks.emit(selected);
    }
  }

  openEditDialog(book: Book | null = null) {
    const ref = this._dialog.open(AddBookComponent, {
      width: '500px',
      data: { categoryId: this.categoryId, book, categories: this.categories }
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.reloadBooks.emit();
      }
    });
  }

  openDeleteConfirmDialog(book: Book) {
    this._toasterService.confirmBox('Are you sure?', "You won't be able to revert this!").then((result) => {
      if (result.value) {
        this.deleteBook(book);
      }
    });
  }

  deleteBook(book: Book) {
    this._bookService.deleteBook(book.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.errorCode === ErrorCode.Success) {
            this.reloadBooks.emit();
            this._toasterService.success('Deleted Successfully!');
          } else {
            this._toasterService.success('Error', data.message);
          }
        },
        error: (err) => this._toasterService.success('Error', err.message)
      });
  }

  openRemoveConfirmDialog(book: Book) {
    if (!this.categoryId) return;

    this._toasterService.confirmBox('Are you sure?', "You won't be able to revert this!").then((result) => {
      if (result.value) {
        this.removeBookFromCategory(book);
       
      }
    });
  }

  removeBookFromCategory(book: Book) {
    if (!this.categoryId) return;

    this._bookService.removeBookFromCategory(book.id, this.categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.errorCode === ErrorCode.Success) {
            this.reloadBooks.emit();
            this._toasterService.success('Deleted Successfully!');
          } else {
            this._toasterService.success('Error', data.message);
          }
        },
        error: (err) => this._toasterService.success('Error', err.message)
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
