using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class RasteplassRepository : IRasteplassRepository
    {
        private readonly RasteplassDbContext _context;
        private readonly ILogger<RasteplassRepository> _logger;

        public RasteplassRepository(RasteplassDbContext context, ILogger<RasteplassRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        
        public async Task<IEnumerable<Rasteplass>> GetAllAsync()
        {
            return await _context.Rasteplasser.ToListAsync();
        }

        public async Task<Rasteplass> GetByIdAsync(int id)
        {
            return await _context.Rasteplasser.FindAsync(id);
        }

        public async Task<IEnumerable<Rasteplass>> GetByKommuneAsync(string kommune)
        {
            return await _context.Rasteplasser
                .Where(r => r.geo_kommune.ToLower() == kommune.ToLower())
                .ToListAsync();
        }

        public async Task<IEnumerable<Rasteplass>> GetByFylkeAsync(string fylke)
        {
            return await _context.Rasteplasser
                .Where(r => r.geo_fylke.ToLower() == fylke.ToLower())
                .ToListAsync();
        }

        public async Task<Rasteplass> CreateAsync(Rasteplass rasteplass)
        {
            rasteplass.laget = DateTime.Now;
            rasteplass.oppdatert = DateTime.Now;
            
            _context.Rasteplasser.Add(rasteplass);
            await _context.SaveChangesAsync();
            
            return rasteplass;
        }

        public async Task<Rasteplass> UpdateAsync(Rasteplass rasteplass)
        {
            var eksisterende = await _context.Rasteplasser.FindAsync(rasteplass.rasteplass_id);
            
            if (eksisterende == null)
                return null;

            // Behold original opprettelsesdato
            rasteplass.laget = eksisterende.laget;
            rasteplass.oppdatert = DateTime.Now;
            
            _context.Entry(eksisterende).CurrentValues.SetValues(rasteplass);
            await _context.SaveChangesAsync();
            
            return eksisterende;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var rasteplass = await _context.Rasteplasser.FindAsync(id);
            
            if (rasteplass == null)
                return false;
            
            _context.Rasteplasser.Remove(rasteplass);
            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}