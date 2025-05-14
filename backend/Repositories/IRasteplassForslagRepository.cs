using backend.Models;

namespace backend.Repositories
{
    public interface IRasteplassForslagRepository
    {
        Task<IEnumerable<RasteplassForslag>> GetAllAsync();
        Task<RasteplassForslag> GetByIdAsync(int id);
        Task<RasteplassForslag> CreateAsync(RasteplassForslag forslag, string ipAddress);
        Task<bool> UpdateForslagAsync(RasteplassForslag forslag, string ipAddress);
        Task<bool> DeleteAsync(int id);
        Task<Rasteplass> GodkjennForslagAsync(int id);
    }
}