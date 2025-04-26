using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly RasteplassDbContext _context;

        public UserRepository(RasteplassDbContext context)
        {
            _context = context;
        }
        public IQueryable<User> GetUsers() => _context.Brukere;

    }
}