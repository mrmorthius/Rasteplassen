using backend.Models;

namespace backend.Services
{
    public interface IRasteplassService
    {
        Task<IEnumerable<Rasteplass>> GetRasteplasserAsync();
        Task<Rasteplass?> GetRasteplassByIdAsync(int id);
        Task<IEnumerable<Rasteplass>> GetRasteplasserByKommuneAsync(string kommune);
        Task<IEnumerable<Rasteplass>> GetRasteplasserByFylkeAsync(string fylke);
        Task<Rasteplass> CreateRasteplassAsync(Rasteplass rasteplass);
        Task<Rasteplass> UpdateRasteplassAsync(Rasteplass rasteplass);
        Task<bool> DeleteRasteplassAsync(int id);
    }
}