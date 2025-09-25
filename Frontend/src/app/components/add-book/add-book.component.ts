import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../modules/books/services/book.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorCode } from '../../enums/errorCode.enum';
import { Book } from '../../modules/books/models/book.model';
import { Category } from '../../modules/categories/models/category.model';
import { ToasterService } from '../../services/toaster.service';
import { ApiResponse } from '../../models/api-response.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
  standalone: false
})
export class AddBookComponent {
  bookForm: FormGroup;
  book: Book | null = null;
  categories: Category[] = [];
  categoryId: number | null = null;

  private destroy$ = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      categoryId: number;
      book: Book;
      categories: Category[]
    },
    private fb: FormBuilder,
    private _bookService: BookService,
    private _toasterService: ToasterService) {

    this.book = data.book;
    this.categories = data.categories;
    this.categoryId = data.categoryId;

    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      categories: [this.categoryId ? [this.categoryId] : '']
    });

    console.log(this.bookForm);

    if (this.book) {
      this.bookForm.patchValue(this.book);
      if (this.book.categories?.length > 0) {
        this.bookForm.get('categories')?.setValue(this.book.categories.map(cat => cat.id));
      }
    }
  }

  onSubmit() {
    console.log(this.bookForm);
    if (this.bookForm.valid) {
      console.log('Book Data:', this.bookForm.value);
      if (this.book) {
        this._bookService.updateBook(this.book.id, this.bookForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: ApiResponse<Book>) => {
              if (res.errorCode === ErrorCode.Success) {
                this._toasterService.success('Book Updated Successfully');
                this.dialogRef.close(this.bookForm.value);
              } else {
                this._toasterService.error('Something Went Wrong', res.message);
              }
            },
            error: (error) => this._toasterService.error('Something Went Wrong', error.message)
          });
      } else {
        this._bookService.createBook(this.bookForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: ApiResponse<Book>) => {
              if (res.errorCode === ErrorCode.Success) {
                this._toasterService.success('Book Added Successfully');
                this.dialogRef.close(this.bookForm.value);
              } else {
                this._toasterService.error('Something Went Wrong', res.message);
              }
            },
            error: (error) => this._toasterService.error('Something Went Wrong', error.message)
          });
      }
    } else {
      this.bookForm.markAllAsTouched();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
