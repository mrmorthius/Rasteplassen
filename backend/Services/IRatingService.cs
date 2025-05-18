using backend.Models;

namespace backend.Services
{
    public interface IRatingService
    {
        Task<Rating> GetRatingById(int id);
        Task<IEnumerable<Rating>> GetRatingsByRasteplass(int id);
        Task<Rating> CreateRating(Rating rating, string ipAddress);
        Task<bool> DeleteRating(int id);
    }
}