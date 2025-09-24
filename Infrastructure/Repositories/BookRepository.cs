using Infrastructure.Data;
using System.Data;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Application.DTOs;

namespace Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;
        private readonly string _connectionString;

        public BookRepository(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _connectionString = config.GetConnectionString("DefaultConnection");
        }

        public async Task<IEnumerable<Book>> GetAllAsync(string? search, int? categoryId)
        {
            var query = _context.Books
                .Include(b => b.BookCategories)
                .ThenInclude(bc => bc.Category)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(b =>
                    b.Title.Contains(search) ||
                    b.Author.Contains(search));
            }

            if (categoryId.HasValue)
            {
                query = query.Where(b =>
                    b.BookCategories.Any(bc => bc.CategoryId == categoryId.Value));
            }

            return await query.ToListAsync();
        }


        public async Task<Book> GetByIdAsync(int id)
            => await _context.Books.Include(b => b.BookCategories)
                                   .ThenInclude(bc => bc.Category)
                                   .FirstOrDefaultAsync(b => b.Id == id);

        public async Task AddAsync(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Book book)
        {
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book != null)
            {
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<BookDto>> GetAllBooksWithCategoriesAsync(string? search, int? categoryId)
        {
            var books = new Dictionary<int, BookDto>();

            using (var conn = new SqlConnection(_connectionString))
            using (var cmd = new SqlCommand("sp_GetAllBooksWithCategories", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Search", (object?)search ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@CategoryId", (object?)categoryId ?? DBNull.Value);

                await conn.OpenAsync();

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        int bookId = reader.GetInt32(reader.GetOrdinal("BookId"));

                        if (!books.TryGetValue(bookId, out var bookDto))
                        {
                            bookDto = new BookDto
                            {
                                Id = bookId,
                                Title = reader["Title"].ToString(),
                                Author = reader["Author"].ToString(),
                                Categories = new List<BookCategoryDto>()
                            };

                            books.Add(bookId, bookDto);
                        }

                        // Add category if it exists
                        if (!(reader["CategoryId"] is DBNull))
                        {
                            bookDto.Categories.Add(new BookCategoryDto
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                Name = reader["CategoryName"].ToString()
                            });
                        }
                    }
                }
            }

            return books.Values.ToList();
        }


        public async Task<bool> RemoveBookFromCategoryAsync(int bookId, int categoryId)
        {
            var bookCategory = await _context.BookCategories
                .FirstOrDefaultAsync(bc => bc.BookId == bookId && bc.CategoryId == categoryId);

            if (bookCategory == null)
                return false;

            _context.BookCategories.Remove(bookCategory);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
