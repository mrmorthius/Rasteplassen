using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class RasteplassService : IRasteplassService
    {
        private readonly IRasteplassRepository _repository;
        private readonly ILogger<RasteplassService> _logger;

        public RasteplassService(IRasteplassRepository repository, ILogger<RasteplassService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<Rasteplass>> GetRasteplasserAsync()
        {
            _logger.LogInformation("Henter alle rasteplasser");
            return await _repository.GetAllAsync();
        }

        public async Task<Rasteplass?> GetRasteplassByIdAsync(int id)
        {
            _logger.LogInformation("Henter rasteplass med ID {Id}", id);
            return await _repository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Rasteplass>> GetRasteplasserByKommuneAsync(string kommune)
        {
            _logger.LogInformation("Henter rasteplasser i kommune {Kommune}", kommune);
            return await _repository.GetByKommuneAsync(kommune);
        }

        public async Task<IEnumerable<Rasteplass>> GetRasteplasserByFylkeAsync(string fylke)
        {
            _logger.LogInformation("Henter rasteplasser i fylke {Fylke}", fylke);
            return await _repository.GetByFylkeAsync(fylke);
        }

        public async Task<Rasteplass> CreateRasteplassAsync(Rasteplass rasteplass)
        {
            _logger.LogInformation("Oppretter ny rasteplass: {Navn}", rasteplass.rasteplass_navn);
            return await _repository.CreateAsync(rasteplass);
        }

        public async Task<Rasteplass> UpdateRasteplassAsync(Rasteplass rasteplass)
        {
            _logger.LogInformation("Oppdaterer rasteplass med ID {Id}", rasteplass.rasteplass_id);
            return await _repository.UpdateAsync(rasteplass);
        }

        public async Task<bool> DeleteRasteplassAsync(int id)
        {
            _logger.LogInformation("Sletter rasteplass med ID {Id}", id);
            return await _repository.DeleteAsync(id);
        }
    }
}