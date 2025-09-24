using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum ErrorCode
    {
        Success = 0,
        NotFound = 1,
        ValidationError = 2,
        ServerError = 3,
        Unauthorized = 4
    }
}
