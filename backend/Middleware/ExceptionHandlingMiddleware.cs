using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace backend.Middleware
{
    public class ValidationException : Exception
    {
        public IEnumerable<string> Errors { get; }

        public ValidationException(IEnumerable<string> errors) : base("Validation failed")
        {
            Errors = errors;
        }
    }

    public class NotFoundException : Exception
    {
        public NotFoundException(string message) : base(message) { }
    }

    public class ExceptionHandlingMiddleware : IExceptionHandler
    {
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public ExceptionHandlingMiddleware(
            ILogger<ExceptionHandlingMiddleware> logger,
            IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
        {
            var (statusCode, title, details) = exception switch
            {
                ValidationException validationException => (
                    StatusCodes.Status400BadRequest,
                    "Validering feilet",
                    validationException.Errors
                ),
                NotFoundException => (
                    StatusCodes.Status404NotFound,
                    "Ressursen ble ikke funnet",
                    new[] { exception.Message }
                ),
                KeyNotFoundException => (
                    StatusCodes.Status404NotFound,
                    "Ressursen ble ikke funnet",
                    new[] { exception.Message }
                ),
                UnauthorizedAccessException => (
                    StatusCodes.Status401Unauthorized,
                    "Ikke autorisert",
                    new[] { exception.Message }
                ),
                _ => (
                    StatusCodes.Status500InternalServerError,
                    "Intern serverfeil",
                    new[] { "Det oppstod en uventet feil. Vennligst prøv igjen senere." }
                )
            };

            _logger.LogError(
                exception,
                "Request {Method} {Path} failed with status code {StatusCode} - {Title}: {Details}",
                httpContext.Request.Method,
                httpContext.Request.Path,
                statusCode,
                title,
                string.Join(" ", details));

            var problemDetails = new ProblemDetails
            {
                Status = statusCode,
                Title = title,
                Detail = string.Join(" ", details),
                Instance = httpContext.Request.Path
            };

            if (exception is ValidationException)
            {
                problemDetails.Extensions["errors"] = details;
            }

            // Legg til stack trace i utviklingsmiljø
            if (_env.IsDevelopment())
            {
                problemDetails.Extensions["exceptionDetails"] = exception.ToString();
            }

            httpContext.Response.StatusCode = statusCode;
            httpContext.Response.ContentType = "application/problem+json";
            await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);

            return true;
        }
    }
}