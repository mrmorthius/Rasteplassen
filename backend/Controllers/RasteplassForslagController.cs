using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RasteplassForslagController : ControllerBase
    {
        private readonly ILogger<RasteplassForslagController> _logger;
        private readonly IRasteplassForslagService _forslagService;

        public RasteplassForslagController(
            ILogger<RasteplassForslagController> logger,
            IRasteplassForslagService forslagService)
        {
            _forslagService = forslagService;
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetForslag()
        {
            _logger.LogInformation("Henter rasteplassforslag: {Time}", DateTime.UtcNow);
            var forslag = await _forslagService.GetForslagAsync();

            return Ok(forslag);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetForslag(int id)
        {
            _logger.LogInformation("Henter rasteplassforslag med ID {Id}: {Time}", id, DateTime.UtcNow);
            var forslag = await _forslagService.GetForslagByIdAsync(id);

            if (forslag == null)
                return NotFound(new { message = $"Forslag med ID {id} ble ikke funnet" });

            return Ok(forslag);
        }

        [HttpPost]
        public async Task<IActionResult> CreateForslag([FromBody] RasteplassForslag forslag)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Hent IP-adresse fra request
            string ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "ukjent";

            _logger.LogInformation("Oppretter nytt rasteplassforslag: {Time}", DateTime.UtcNow);
            var createdForslag = await _forslagService.CreateForslagAsync(forslag, ipAddress);

            return CreatedAtAction(nameof(GetForslag),
                new { id = createdForslag.forslag_id },
                createdForslag);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForslag(int id)
        {
            _logger.LogInformation("Sletter rasteplassforslag med ID {Id}: {Time}", id, DateTime.UtcNow);
            var result = await _forslagService.DeleteForslagAsync(id);

            if (!result)
                return NotFound(new { message = $"Forslag med ID {id} ble ikke funnet" });

            return NoContent();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateForslag(int id, [FromBody] RasteplassForslag forslag)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != forslag.forslag_id)
                return BadRequest(new { message = "ID i URL matcher ikke ID i objektet" });

            string ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "ukjent";

            _logger.LogInformation("Oppdaterer rasteplassforslag med ID {Id}: {Time}", id, DateTime.UtcNow);
            var result = await _forslagService.UpdateForslagAsync(forslag, ipAddress);

            if (!result)
                return NotFound(new { message = $"Forslag med ID {id} ble ikke funnet" });

            return NoContent();
        }

        [Authorize]
        [HttpPost("{id}/godkjenn")]
        public async Task<IActionResult> GodkjennForslag(int id)
        {
            _logger.LogInformation("Godkjenner rasteplassforslag med ID {Id}: {Time}", id, DateTime.UtcNow);
            var rasteplass = await _forslagService.GodkjennForslagAsync(id);

            if (rasteplass == null)
                return NotFound(new { message = $"Forslag med ID {id} ble ikke funnet" });

            return Ok(rasteplass);
        }
    }
}