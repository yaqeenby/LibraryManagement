using Application.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IBookRepository
    {
        Task<Book> GetByIdAsync(int id);
        Task<IEnumerable<Book>> GetAllAsync(string? search, int? categoryId);
        Task AddAsync(Book book);
        Task UpdateAsync(Book book);
        Task DeleteAsync(int id);

        // ADO.NET + SP
        Task<IEnumerable<BookDto>> GetAllBooksWithCategoriesAsync(string? search, int? categoryId);
        Task<bool> RemoveBookFromCategoryAsync(int bookId, int categoryId);
    }
}
