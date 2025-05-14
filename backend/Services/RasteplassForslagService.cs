using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class RasteplassForslagService : IRasteplassForslagService
    {
        private readonly IRasteplassForslagRepository _repository;
        private readonly ILogger<RasteplassForslagService> _logger;

        public RasteplassForslagService(IRasteplassForslagRepository repository, ILogger<RasteplassForslagService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<RasteplassForslag>> GetForslagAsync()
        {
            _logger.LogInformation("Henter alle rasteplassforslag");
            return await _repository.GetAllAsync();
        }

        public async Task<RasteplassForslag> GetForslagByIdAsync(int id)
        {
            _logger.LogInformation("Henter rasteplassforslag med ID {Id}", id);
            return await _repository.GetByIdAsync(id);
        }

        public async Task<RasteplassForslag> CreateForslagAsync(RasteplassForslag forslag, string ipAddress)
        {
            _logger.LogInformation("Oppretter nytt rasteplassforslag: {Navn}", forslag.rasteplass_navn);
            return await _repository.CreateAsync(forslag, ipAddress);
        }

        public async Task<bool> UpdateForslagAsync(RasteplassForslag forslag, string ipAddress)
        {
            _logger.LogInformation("Oppdaterer rasteplassforslag: {Navn}", forslag.rasteplass_navn);
            return await _repository.UpdateForslagAsync(forslag, ipAddress);
        }


        public async Task<bool> DeleteForslagAsync(int id)
        {
            _logger.LogInformation("Sletter rasteplassforslag med ID {Id}", id);
            return await _repository.DeleteAsync(id);
        }

        public async Task<Rasteplass> GodkjennForslagAsync(int id)
        {
            _logger.LogInformation("Godkjenner rasteplassforslag med ID {Id}", id);
            return await _repository.GodkjennForslagAsync(id);
        }
    }
}