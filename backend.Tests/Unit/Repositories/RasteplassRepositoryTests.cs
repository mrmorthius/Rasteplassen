using backend.Data;
using backend.Models;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Unit.Repositories
{
    public class RasteplassRepositoryTests : IDisposable
    {
        private readonly RasteplassDbContext _context;
        private readonly RasteplassRepository _repository;
        private readonly Mock<ILogger<RasteplassRepository>> _loggerMock;

        public RasteplassRepositoryTests()
        {
            // Set up in-memory database for testing
            var options = new DbContextOptionsBuilder<RasteplassDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new RasteplassDbContext(options);
            
            // Create a mock logger
            _loggerMock = new Mock<ILogger<RasteplassRepository>>();
            
            _repository = new RasteplassRepository(_context, _loggerMock.Object);
            
            // Seed database with test data
            SeedDatabase();
        }

        private void SeedDatabase()
        {
            // Add test data to the in-memory database
            _context.Rasteplasser.AddRange(
                new Rasteplass 
                { 
                    rasteplass_id = 1, 
                    vegvesen_id = 1,
                    geo_kommune = "Oslo",
                    geo_fylke = "Oslo",
                    rasteplass_navn = "Test Rasteplass 1",
                    rasteplass_type = "Type1",
                    rasteplass_lat = 59.9139M,
                    rasteplass_long = 10.7522M,
                    rasteplass_toalett = true,
                    rasteplass_tilgjengelig = true,
                    rasteplass_informasjon = "Test Description 1",
                    rasteplass_renovasjon = "Ja",
                    laget = DateTime.Now,
                    oppdatert = DateTime.Now
                },
                new Rasteplass 
                { 
                    rasteplass_id = 2, 
                    vegvesen_id = 2,
                    geo_kommune = "Bergen",
                    geo_fylke = "Vestland",
                    rasteplass_navn = "Test Rasteplass 2",
                    rasteplass_type = "Type2",
                    rasteplass_lat = 60.3913M,
                    rasteplass_long = 5.3221M,
                    rasteplass_toalett = false,
                    rasteplass_tilgjengelig = true,
                    rasteplass_informasjon = "Test Description 2",
                    rasteplass_renovasjon = "Nei",
                    laget = DateTime.Now,
                    oppdatert = DateTime.Now
                }
            );
            _context.SaveChanges();
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllRasteplasser()
        {
            // Act
            var result = await _repository.GetAllAsync();

            // Assert
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public async Task GetByIdAsync_ShouldReturnCorrectRasteplass()
        {
            // Act
            var result = await _repository.GetByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test Rasteplass 1", result.rasteplass_navn);
        }

        [Fact]
        public async Task CreateAsync_ShouldAddNewRasteplass()
        {
            // Arrange
            var newRasteplass = new Rasteplass
            {
                vegvesen_id = 3,
                geo_kommune = "Drammen",
                geo_fylke = "Viken",
                rasteplass_navn = "New Rasteplass",
                rasteplass_type = "Type3",
                rasteplass_lat = 61.4720M,
                rasteplass_long = 5.3520M,
                rasteplass_toalett = true,
                rasteplass_tilgjengelig = true,
                rasteplass_informasjon = "New Description",
                rasteplass_renovasjon = "Ja",
                laget = DateTime.Now,
                oppdatert = DateTime.Now
            };

            // Act
            var result = await _repository.CreateAsync(newRasteplass);
            var allRasteplasser = await _repository.GetAllAsync();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, allRasteplasser.Count());
            Assert.Equal("New Rasteplass", result.rasteplass_navn);
        }

        // Clean up after test
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}