using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;

namespace Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<ApiResponse<IEnumerable<BookDto>>> GetAllBooksAsync(string? search, int? categoryId)
        {
            try
            {
                var books = await _bookRepository.GetAllBooksWithCategoriesAsync(search, categoryId);

                return ApiResponse<IEnumerable<BookDto>>.Success(books);
            }
            catch (Exception ex)
            {
                return ApiResponse<IEnumerable<BookDto>>.Fail(ErrorCode.ServerError, ex.Message);
            }
        }

        public async Task<ApiResponse<BookDto>> GetBookByIdAsync(int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);

            if (book == null)
                return ApiResponse<BookDto>.Fail(ErrorCode.NotFound, "Book not found");

            var dto = new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author
            };

            if(book.BookCategories != null && book.BookCategories.Count > 0)
            {
                dto.Categories = book.BookCategories
                .Select(bc => new BookCategoryDto
                {
                    Id = bc.CategoryId,
                    Name = bc.Category.Name
                }).ToList();
            }

            return ApiResponse<BookDto>.Success(dto);
        }

        public async Task<ApiResponse<BookDto>> AddBookAsync(BookRequestDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                return ApiResponse<BookDto>.Fail(ErrorCode.ValidationError, "Book title cannot be empty");

            if (string.IsNullOrWhiteSpace(dto.Author))
                return ApiResponse<BookDto>.Fail(ErrorCode.ValidationError, "Book author cannot be empty");

            var book = new Book
            {
                Title = dto.Title,
                Author = dto.Author,
                BookCategories = dto.Categories.Select(catId => new BookCategory
                {
                    CategoryId = catId
                }).ToList()
            };

            await _bookRepository.AddAsync(book);


            var dtoRes = new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author
            };

            return ApiResponse<BookDto>.Success(dtoRes, "Book created successfully");
        }

        public async Task<ApiResponse<BookDto>> UpdateBookAsync(int id, BookRequestDto dto)
        {
            var existingBook = await _bookRepository.GetByIdAsync(id);
            if (existingBook == null)
                return ApiResponse<BookDto>.Fail(ErrorCode.NotFound, "Book not found");

            existingBook.Title = dto.Title;
            existingBook.Author = dto.Author;

            if (existingBook.BookCategories != null)
            {
                existingBook.BookCategories.Clear();
            }

            // add new ones
            foreach (var catId in dto.Categories)
            {
                existingBook.BookCategories.Add(new BookCategory
                {
                    BookId = id,
                    CategoryId = catId
                });
            }

            await _bookRepository.UpdateAsync(existingBook);

            var dtoRes = new BookDto
            {
                Id = existingBook.Id,
                Title = existingBook.Title,
                Author = existingBook.Author
            };

            return ApiResponse<BookDto>.Success(dtoRes, "Book updated successfully");
        }


        public async Task<ApiResponse<bool>> DeleteBookAsync(int id)
        {
            var existingBook = await _bookRepository.GetByIdAsync(id);
            if (existingBook == null)
                return ApiResponse<bool>.Fail(ErrorCode.NotFound, "Book not found");

            await _bookRepository.DeleteAsync(id);
            return ApiResponse<bool>.Success(true, "Book deleted successfully");
        }

        public async Task<ApiResponse<bool>> RemoveBookFromCategoryAsync(int bookId, int categoryId)
        {
            var removed = await _bookRepository.RemoveBookFromCategoryAsync(bookId, categoryId);

            if (!removed)
                return ApiResponse<bool>.Fail(ErrorCode.NotFound, "Book or category not found, or not assigned.");

            return ApiResponse<bool>.Success(true, "Book removed from category successfully");
        }
    }
}
