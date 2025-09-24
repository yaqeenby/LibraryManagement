using Application.DTOs;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface ICategoryService
    {
        Task<ApiResponse<IEnumerable<CategoryDto>>> GetAllAsync(string? search);
        Task<ApiResponse<CategoryDto>> GetByIdAsync(int id);
        Task<ApiResponse<CategoryDto>> AddAsync(CategoryRequest category);
        Task<ApiResponse<CategoryDto>> UpdateAsync(int id, CategoryRequest category);
        Task<ApiResponse<bool>> DeleteAsync(int id);
    }
}
