using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ApiResponse<IEnumerable<CategoryDto>>> GetAll(string? search)
        {
            return await _categoryService.GetAllAsync(search);
        }

        [HttpGet("{id}")]
        public async Task<ApiResponse<CategoryDto>> Get(int id)
        {
            return await _categoryService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ApiResponse<CategoryDto>> Create(CategoryRequest category)
        {
            return await _categoryService.AddAsync(category);
        }

        [HttpPut("{id}")]
        public async Task<ApiResponse<CategoryDto>> Update(int id, CategoryRequest category)
        {
            return await _categoryService.UpdateAsync(id, category);
        }

        [HttpDelete("{id}")]
        public async Task<ApiResponse<bool>> Delete(int id)
        {
            return await _categoryService.DeleteAsync(id);
        }
    }
}