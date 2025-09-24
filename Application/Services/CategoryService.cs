using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;

namespace Application.Services
{
    public class CategoryService: ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<ApiResponse<IEnumerable<CategoryDto>>> GetAllAsync(string? search)
        {
            try
            {
                var categories = await _categoryRepository.GetAllAsync(search);

                var categoriesDto = categories
                    .Select(bc => new CategoryDto
                    {
                        Id = bc.Id,
                        Name = bc.Name
                    }).ToList();

                return ApiResponse<IEnumerable<CategoryDto>>.Success(categoriesDto);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<CategoryDto>>.Fail(ErrorCode.ServerError, ex.Message);
            }
        }

        public async Task<ApiResponse<CategoryDto>> GetByIdAsync(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null)
                return ApiResponse<CategoryDto>.Fail(ErrorCode.NotFound, "Category not found");

            var dto = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name
            };

            return ApiResponse<CategoryDto>.Success(dto);
        }

        public async Task<ApiResponse<CategoryDto>> AddAsync(CategoryRequest dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Name))
                return ApiResponse<CategoryDto>.Fail(ErrorCode.ValidationError, "Category Name cannot be empty");

            var category = new Category();
            category.Name = dto.Name;

            await _categoryRepository.AddAsync(category);

            var res = new CategoryDto();
            res.Name = dto.Name;

            return ApiResponse<CategoryDto>.Success(res, "Category created successfully");
        }

        public async Task<ApiResponse<CategoryDto>> UpdateAsync(int id, CategoryRequest dto)
        {
            var existingCategory = await _categoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
                return ApiResponse<CategoryDto>.Fail(ErrorCode.NotFound, "Category not found");

            existingCategory.Name = dto.Name;

            await _categoryRepository.UpdateAsync(existingCategory);

            var res = new CategoryDto();
            res.Name = dto.Name;

            return ApiResponse<CategoryDto>.Success(res, "Category updated successfully");
        }

        public async Task<ApiResponse<bool>> DeleteAsync(int id)
        {
            var existingCategory = await _categoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
                return ApiResponse<bool>.Fail(ErrorCode.NotFound, "Category not found");

            await _categoryRepository.DeleteAsync(id);
            return ApiResponse<bool>.Success(true, "Category deleted successfully");
        }
    }
}
