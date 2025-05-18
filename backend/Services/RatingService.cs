using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class RatingService : IRatingService
    {
        private readonly IRatingRepository _repository;
        private readonly ILogger<RatingService> _logger;

        public RatingService(IRatingRepository repository, ILogger<RatingService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<Rating?> GetRatingById(int id)
        {
            _logger.LogInformation($"Henter vurdering {id}");
            return await _repository.GetRatingById(id);
        }

        public async Task<IEnumerable<Rating>> GetRatingsByRasteplass(int id)
        {
            _logger.LogInformation($"Henter vurderinger fra rasteplass med ID {id}");
            return await _repository.GetRatingsByRasteplass(id);
        }

        public async Task<Rating> CreateRating(Rating rating, string ipAddress)
        {
            _logger.LogInformation($"Oppretter ny vurdering: {rating.vurdering_id}");
            return await _repository.CreateRating(rating, ipAddress);
        }

        public async Task<bool> DeleteRating(int id)
        {
            _logger.LogInformation($"Sletter vurdering med ID {id}");
            return await _repository.DeleteRating(id);
        }
    }
}