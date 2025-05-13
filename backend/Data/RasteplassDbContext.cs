using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class RasteplassDbContext : DbContext
    {
        public RasteplassDbContext(DbContextOptions<RasteplassDbContext> options) : base(options) { }
        public DbSet<Rasteplass> Rasteplasser { get; set; }
        public DbSet<RasteplassForslag> RasteplasserForslag { get; set; }
        public DbSet<User> Brukere { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
        }
    }
}