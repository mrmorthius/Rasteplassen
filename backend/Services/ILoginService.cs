using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Services
{
    public interface ILoginService
    {
        IEnumerable<User> GetUsers();
        Task<User?> CheckUser(string email, string password);
        string CreateToken(User user);
        bool VerifyPassword(string password, string hashedPassword);
        string HashPassword(string password);
    }
}