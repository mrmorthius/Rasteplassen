using backend.Models;

namespace backend.Repositories
{
    public interface IRasteplassRepository
    {
        Task<IEnumerable<Rasteplass>> GetAllAsync();
        Task<Rasteplass> GetByIdAsync(int id);
        Task<IEnumerable<Rasteplass>> GetByKommuneAsync(string kommune);
        Task<IEnumerable<Rasteplass>> GetByFylkeAsync(string fylke);
        Task<Rasteplass> CreateAsync(Rasteplass rasteplass);
        Task<Rasteplass> UpdateAsync(Rasteplass rasteplass);
        Task<bool> DeleteAsync(int id);
    }
}    