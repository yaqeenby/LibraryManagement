using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using Domain.Entities;
using Application.DTOs;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ApiResponse<IEnumerable<BookDto>>> GetAll(string? search, int? categoryId)
        {
            return await _bookService.GetAllBooksAsync(search, categoryId);
        }

        [HttpGet("{id}")]
        public async Task<ApiResponse<BookDto>> Get(int id)
        {
            return await _bookService.GetBookByIdAsync(id);
        }

        [HttpPost]
        public async Task<ApiResponse<BookDto>> Create(BookRequestDto dto)
        {
            return await _bookService.AddBookAsync(dto);
        }

        [HttpPut("{id}")]
        public async Task<ApiResponse<BookDto>> Update(int id, BookRequestDto dto)
        {
            return await _bookService.UpdateBookAsync(id, dto);
        }

        [HttpDelete("{id}")]
        public async Task<ApiResponse<bool>> Delete(int id)
        {
            return await _bookService.DeleteBookAsync(id);
        }

        [HttpDelete("RemoveBookFromCategory/{id}/{categoryId}")]
        public async Task<ApiResponse<bool>> RemoveBookFromCategory(int id, int categoryId)
        {
            return await _bookService.RemoveBookFromCategoryAsync(id, categoryId);
        }
    }

}
