using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class HealthController : ControllerBase
{
    private readonly ILogger<HealthController> _logger;

    public HealthController(ILogger<HealthController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Health check: {Time}", DateTime.UtcNow);

        return Ok(new
        {
            status = "Healthy",
            time = DateTime.UtcNow,
            version = "1.0.0"
        });
    }
}
