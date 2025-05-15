using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RasteplassController : ControllerBase
    {
        private readonly ILogger<RasteplassController> _logger;
        private readonly IRasteplassService _rasteplassService;

        public RasteplassController(ILogger<RasteplassController> logger, IRasteplassService rasteplassService)
        {
            _rasteplassService = rasteplassService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetRasteplasser()
        {
            _logger.LogInformation("Henter rasteplasser: {Time}", DateTime.UtcNow);
            var rasteplasser = await _rasteplassService.GetRasteplasserAsync();

            return Ok(rasteplasser);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRasteplass(int id)
        {
            _logger.LogInformation("Henter rasteplass med ID {Id}: {Time}", id, DateTime.UtcNow);
            var rasteplass = await _rasteplassService.GetRasteplassByIdAsync(id);

            if (rasteplass == null)
                return NotFound(new { message = $"Rasteplass med ID {id} ble ikke funnet" });

            return Ok(rasteplass);
        }

        [HttpGet("kommune/{kommune}")]
        public async Task<IActionResult> GetRasteplasserByKommune(string kommune)
        {
            _logger.LogInformation("Henter rasteplasser i kommune {Kommune}: {Time}", kommune, DateTime.UtcNow);
            var rasteplasser = await _rasteplassService.GetRasteplasserByKommuneAsync(kommune);

            return Ok(rasteplasser);
        }

        [HttpGet("fylke/{fylke}")]
        public async Task<IActionResult> GetRasteplasserByFylke(string fylke)
        {
            _logger.LogInformation("Henter rasteplasser i fylke {Fylke}: {Time}", fylke, DateTime.UtcNow);
            var rasteplasser = await _rasteplassService.GetRasteplasserByFylkeAsync(fylke);

            return Ok(rasteplasser);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateRasteplass([FromBody] Rasteplass rasteplass)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _logger.LogInformation("Oppretter ny rasteplass: {Time}", DateTime.UtcNow);
            var createdRasteplass = await _rasteplassService.CreateRasteplassAsync(rasteplass);

            return CreatedAtAction(nameof(GetRasteplass), new { id = createdRasteplass.rasteplass_id }, createdRasteplass);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRasteplass(int id, [FromBody] Rasteplass rasteplass)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != rasteplass.rasteplass_id)
                return BadRequest(new { message = "ID i path og body må stemme overens" });

            _logger.LogInformation("Oppdaterer rasteplass med ID {Id}: {Time}", id, DateTime.UtcNow);
            var updatedRasteplass = await _rasteplassService.UpdateRasteplassAsync(rasteplass);

            if (updatedRasteplass == null)
                return NotFound(new { message = $"Rasteplass med ID {id} ble ikke funnet" });

            return Ok(updatedRasteplass);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRasteplass(int id)
        {
            _logger.LogInformation("Sletter rasteplass med ID {Id}: {Time}", id, DateTime.UtcNow);
            var result = await _rasteplassService.DeleteRasteplassAsync(id);

            if (!result)
                return NotFound(new { message = $"Rasteplass med ID {id} ble ikke funnet" });

            return NoContent();
        }

        [HttpGet("test-exception")]
        public IActionResult TestException()
        {
            throw new Exception("Test av ExceptionHandlingMiddleware");
        }
    }
}