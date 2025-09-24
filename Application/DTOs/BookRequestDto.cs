using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class BookRequestDto
    {
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public List<int> Categories { get; set; } = new();
    }
}
