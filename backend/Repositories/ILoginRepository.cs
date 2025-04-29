using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface ILoginRepository
    {
        IQueryable<User> GetUsers();
    }
}