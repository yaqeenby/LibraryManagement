import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../models/api-response.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'https://localhost:7013/api/Books'; // adjust to your backend URL

  constructor(private api: ApiService) { }

  getBooks(search: string = '', categoryId: number | null = null): Observable<ApiResponse<Book[]>> {
    let params = new HttpParams();

    if (search?.trim()) {
      params = params.set('search', search.trim());
    }
    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }

    return this.api.get<Book[]>(`${this.baseUrl}`, params);
  }

  getBookById(id: number): Observable<ApiResponse<Book>> {
    return this.api.get<Book>(`${this.baseUrl}/${id}`);
  }

  createBook(book: Partial<Book>): Observable<ApiResponse<Book>> {
    return this.api.post<Book>(this.baseUrl, book);
  }

  updateBook(id: number, book: Partial<Book>): Observable<ApiResponse<Book>> {
    return this.api.put<Book>(`${this.baseUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<ApiResponse<Book>> {
    return this.api.delete<Book>(`${this.baseUrl}/${id}`);
  }

  removeBookFromCategory(id: number, categoryId: number): Observable<ApiResponse<Book>> {
    return this.api.delete<Book>(`${this.baseUrl}/RemoveBookFromCategory/${id}/${categoryId}`);
  }
}
