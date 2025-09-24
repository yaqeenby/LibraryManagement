using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public List<BookCategoryDto> Categories { get; set; }
    }

    public class BookCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
