using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Repositories
{
    public class RasteplassForslagRepository : IRasteplassForslagRepository
    {
        private readonly RasteplassDbContext _context;
        private readonly ILogger<RasteplassForslagRepository> _logger;

        public RasteplassForslagRepository(RasteplassDbContext context, ILogger<RasteplassForslagRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<RasteplassForslag>> GetAllAsync()
        {
            return await _context.RasteplasserForslag.ToListAsync();
        }

        public async Task<RasteplassForslag>? GetByIdAsync(int id)
        {
            return await _context.RasteplasserForslag.FindAsync(id);
        }

        public async Task<RasteplassForslag> CreateAsync(RasteplassForslag forslag, string ipAddress)
        {
            forslag.laget = DateTime.Now;
            forslag.ip_adresse = ipAddress;

            _context.RasteplasserForslag.Add(forslag);
            await _context.SaveChangesAsync();

            return forslag;
        }

        public async Task<bool> UpdateForslagAsync(RasteplassForslag forslag, string ipAddress)
        {
            forslag.laget = DateTime.Now;
            forslag.ip_adresse = ipAddress;

            _context.RasteplasserForslag.Update(forslag);
            var result = await _context.SaveChangesAsync();

            return result > 0;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var forslag = await _context.RasteplasserForslag.FindAsync(id);

            if (forslag == null)
                return false;

            _context.RasteplasserForslag.Remove(forslag);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Rasteplass> GodkjennForslagAsync(int id)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var forslag = await _context.RasteplasserForslag.FindAsync(id);

                if (forslag == null)
                    return null;

                // Konverter forslaget til en godkjent rasteplass
                var rasteplass = new Rasteplass
                {
                    vegvesen_id = forslag.vegvesen_id,
                    geo_kommune = forslag.geo_kommune,
                    geo_fylke = forslag.geo_fylke,
                    rasteplass_navn = forslag.rasteplass_navn,
                    rasteplass_type = forslag.rasteplass_type,
                    rasteplass_lat = forslag.rasteplass_lat,
                    rasteplass_long = forslag.rasteplass_long,
                    rasteplass_toalett = forslag.rasteplass_toalett,
                    rasteplass_tilgjengelig = forslag.rasteplass_tilgjengelig,
                    rasteplass_informasjon = forslag.rasteplass_informasjon,
                    rasteplass_renovasjon = forslag.rasteplass_renovasjon,
                    laget = DateTime.Now,
                    oppdatert = DateTime.Now
                };

                _context.Rasteplasser.Add(rasteplass);
                _context.RasteplasserForslag.Remove(forslag);

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return rasteplass;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError(ex, "Feil ved godkjenning av forslag med ID {Id}", id);
                throw;
            }
        }
    }
}