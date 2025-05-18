using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly ILogger<RatingController> _logger;
        private readonly IRatingService _ratingService;

        public RatingController(ILogger<RatingController> logger, IRatingService ratingService)
        {
            _ratingService = ratingService;
            _logger = logger;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRatingById(int id)
        {
            _logger.LogInformation("Henter vurdering med id: {id} : {Time}", id, DateTime.UtcNow);
            var ratings = await _ratingService.GetRatingById(id);

            if (ratings == null)
                return NotFound(new { message = $"Vurdering med ID {id} ble ikke funnet" });

            return Ok(ratings);
        }


        [HttpGet("rasteplass/{id}")]
        public async Task<IActionResult> GetRatingsByRasteplass(int id)
        {
            _logger.LogInformation("Henter vurderinger til rasteplass {id} : {Time}", id, DateTime.UtcNow);
            var ratings = await _ratingService.GetRatingsByRasteplass(id);

            if (!ratings.Any())
                return NotFound(new { message = $"Ingen vurderinger ble funnet til rasteplass {id}" });

            return Ok(ratings);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRating([FromBody] Rating rating)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "ukjent";

            _logger.LogInformation("Oppretter ny vurdering: {Time}", DateTime.UtcNow);
            var createdRating = await _ratingService.CreateRating(rating, ipAddress);

            return CreatedAtAction(nameof(GetRatingById), new { id = createdRating.vurdering_id }, createdRating);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRating(int id)
        {
            _logger.LogInformation("Sletter vurdering med ID {Id}: {Time}", id, DateTime.UtcNow);
            var result = await _ratingService.DeleteRating(id);

            if (!result)
                return NotFound(new { message = $"Vurdering med ID {id} ble ikke funnet" });

            return NoContent();
        }
    }
}