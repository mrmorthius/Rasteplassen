using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly RasteplassDbContext _context;

        public LoginRepository(RasteplassDbContext context)
        {
            _context = context;
        }
        public IQueryable<User> GetUsers() => _context.Brukere;

    }
}