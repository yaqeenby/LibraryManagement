import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { ApiResponse } from '../../../models/api-response.model';
import { Category } from '../models/category.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'https://localhost:7013/api/Categories'; // adjust to your backend URL

  constructor(private api: ApiService) { }

  getCategories(search: string = ''): Observable<ApiResponse<Category[]>> {
    let params = new HttpParams();

    if (search?.trim()) {
      params = params.set('search', search.trim());
    }

    return this.api.get<Category[]>(this.baseUrl, params);
  }

  getCategoryById(id: number): Observable<ApiResponse<Category>> {
    return this.api.get<Category>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.api.post<Category>(this.baseUrl, category);
  }

  updateCategory(id: number, category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.api.put<Category>(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<ApiResponse<Category>> {
    return this.api.delete<Category>(`${this.baseUrl}/${id}`);
  }
}
