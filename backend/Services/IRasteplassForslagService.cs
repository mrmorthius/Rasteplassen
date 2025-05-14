using backend.Models;

namespace backend.Services
{
    public interface IRasteplassForslagService
    {
        Task<IEnumerable<RasteplassForslag>> GetForslagAsync();
        Task<RasteplassForslag> GetForslagByIdAsync(int id);
        Task<RasteplassForslag> CreateForslagAsync(RasteplassForslag forslag, string ipAddress);
        Task<bool> UpdateForslagAsync(RasteplassForslag forslag, string ipAddress);

        Task<bool> DeleteForslagAsync(int id);
        Task<Rasteplass> GodkjennForslagAsync(int id);
    }
}