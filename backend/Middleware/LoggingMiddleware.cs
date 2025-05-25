using Serilog;
using ILogger = Serilog.ILogger;

// random (fjern)
namespace backend.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;

        public LoggingMiddleware(RequestDelegate next)
        {
            _next = next;
            _logger = Log.ForContext<LoggingMiddleware>();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.Information(
                "Incoming Request: {Method} {Path} - Content Type: {ContentType}",
                context.Request.Method,
                context.Request.Path,
                context.Request.ContentType ?? "not specified");

            await _next(context);

            _logger.Information(
                "Response Status: {StatusCode} for {Method} {Path}",
                context.Response.StatusCode,
                context.Request.Method,
                context.Request.Path);
        }
    }
}