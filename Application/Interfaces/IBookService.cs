using Application.DTOs;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IBookService
    {
        Task<ApiResponse<IEnumerable<BookDto>>> GetAllBooksAsync(string? search, int? categoryId);
        Task<ApiResponse<BookDto>> GetBookByIdAsync(int id);
        Task<ApiResponse<BookDto>> AddBookAsync(BookRequestDto dto);
        Task<ApiResponse<BookDto>> UpdateBookAsync(int id, BookRequestDto dto);
        Task<ApiResponse<bool>> DeleteBookAsync(int id);
        Task<ApiResponse<bool>> RemoveBookFromCategoryAsync(int id, int categoryId);
    }
}
