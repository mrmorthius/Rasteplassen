using backend.Models;

namespace backend.Repositories
{
    public interface IRatingRepository
    {
        Task<Rating?> GetRatingById(int id);
        Task<IEnumerable<Rating>> GetRatingsByRasteplass(int id);
        Task<Rating> CreateRating(Rating rating, string ipAddress);
        Task<bool> DeleteRating(int id);
    }
}