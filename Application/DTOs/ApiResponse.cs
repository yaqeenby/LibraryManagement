using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public ErrorCode ErrorCode { get; set; }
        public string Message { get; set; }

        // Convenience methods
        public static ApiResponse<T> Success(T data, string message = "Success")
        {
            return new ApiResponse<T> { Data = data, ErrorCode = ErrorCode.Success, Message = message };
        }

        public static ApiResponse<T> Fail(ErrorCode errorCode, string message)
        {
            return new ApiResponse<T> { Data = default, ErrorCode = errorCode, Message = message };
        }
    }
}
