import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { ApiResponse } from '../../../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class BooksResolver implements Resolve<ApiResponse<Book[]>> {
  constructor(private bookService: BookService) { }

  resolve(): Observable<ApiResponse<Book[]>> {
    return this.bookService.getBooks(); // will be called before route activates
  }
}
