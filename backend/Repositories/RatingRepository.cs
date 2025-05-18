using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class RatingRepository : IRatingRepository
    {
        private readonly RasteplassDbContext _context;
        private readonly ILogger<RatingRepository> _logger;

        public RatingRepository(RasteplassDbContext context, ILogger<RatingRepository> logger)
        {
            _context = context;
            _logger = logger;
        }
        public async Task<Rating?> GetRatingById(int id)
        {
            return await _context.Rating.FirstOrDefaultAsync(v => v.vurdering_id == id);
        }

        public async Task<IEnumerable<Rating>> GetRatingsByRasteplass(int id)
        {
            return await _context.Rating.Include(r => r.rasteplass)
                .Where(r => r.rasteplass_id == id)
                .ToListAsync();
        }

        public async Task<Rating> CreateRating(Rating rating, string ipAddress)
        {
            rating.laget = DateTime.Now;
            rating.ip_adresse = ipAddress;

            _context.Rating.Add(rating);
            await _context.SaveChangesAsync();

            return rating;
        }

        public async Task<bool> DeleteRating(int id)
        {
            var rating = await _context.Rating.FindAsync(id);

            if (rating == null)
                return false;

            _context.Rating.Remove(rating);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}