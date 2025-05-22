using backend.Data;
using backend.Models;
using backend.Repositories;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Integration
{
    public class RasteplassIntegrationTests : IDisposable
    {
        private readonly RasteplassDbContext _context;
        private readonly RasteplassRepository _repository;
        private readonly RasteplassService _service;
        private readonly Mock<ILogger<RasteplassRepository>> _repositoryLoggerMock;
        private readonly Mock<ILogger<RasteplassService>> _serviceLoggerMock;

        public RasteplassIntegrationTests()
        {
            // Set up in-memory database
            var options = new DbContextOptionsBuilder<RasteplassDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new RasteplassDbContext(options);
            
            // Create mock loggers
            _repositoryLoggerMock = new Mock<ILogger<RasteplassRepository>>();
            _serviceLoggerMock = new Mock<ILogger<RasteplassService>>();
            
            _repository = new RasteplassRepository(_context, _repositoryLoggerMock.Object);
            _service = new RasteplassService(_repository, _serviceLoggerMock.Object);
            
            // Seed database
            SeedDatabase();
        }

        private void SeedDatabase()
        {
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
        public async Task FullCycle_CreateAndRetrieveRasteplass()
        {
            // Arrange
            var newRasteplass = new Rasteplass
            {
                vegvesen_id = 3,
                geo_kommune = "Drammen",
                geo_fylke = "Viken",
                rasteplass_navn = "Integration Test Rasteplass",
                rasteplass_type = "Type3",
                rasteplass_lat = 62.4720M,
                rasteplass_long = 6.1520M,
                rasteplass_toalett = true,
                rasteplass_tilgjengelig = true,
                rasteplass_informasjon = "Integration Test Description",
                rasteplass_renovasjon = "Ja",
                laget = DateTime.Now,
                oppdatert = DateTime.Now
            };

            // Act - Create
            var createdRasteplass = await _service.CreateRasteplassAsync(newRasteplass);
            
            // Assert - Create
            Assert.NotNull(createdRasteplass);
            Assert.Equal("Integration Test Rasteplass", createdRasteplass.rasteplass_navn);
            
            // Act - Retrieve by ID
            var retrievedRasteplass = await _service.GetRasteplassByIdAsync(createdRasteplass.rasteplass_id);
            
            // Assert - Retrieve
            Assert.NotNull(retrievedRasteplass);
            Assert.Equal(createdRasteplass.rasteplass_id, retrievedRasteplass.rasteplass_id);
            Assert.Equal("Integration Test Rasteplass", retrievedRasteplass.rasteplass_navn);
            
            // Act - Get all
            var allRasteplasser = await _service.GetRasteplasserAsync();
            
            // Assert - Verify count increased
            Assert.Equal(3, allRasteplasser.Count());
        }

        [Fact]
        public async Task GetByKommune_ShouldReturnCorrectRasteplasser()
        {
            // Act
            var osloRasteplasser = await _service.GetRasteplasserByKommuneAsync("Oslo");
            var bergenRasteplasser = await _service.GetRasteplasserByKommuneAsync("Bergen");
            
            // Assert
            Assert.Single(osloRasteplasser);
            Assert.Single(bergenRasteplasser);
            Assert.Equal("Test Rasteplass 1", osloRasteplasser.First().rasteplass_navn);
            Assert.Equal("Test Rasteplass 2", bergenRasteplasser.First().rasteplass_navn);
        }

        [Fact]
        public async Task GetByFylke_ShouldReturnCorrectRasteplasser()
        {
            // Act
            var osloRasteplasser = await _service.GetRasteplasserByFylkeAsync("Oslo");
            var vestlandRasteplasser = await _service.GetRasteplasserByFylkeAsync("Vestland");
            
            // Assert
            Assert.Single(osloRasteplasser);
            Assert.Single(vestlandRasteplasser);
            Assert.Equal("Test Rasteplass 1", osloRasteplasser.First().rasteplass_navn);
            Assert.Equal("Test Rasteplass 2", vestlandRasteplasser.First().rasteplass_navn);
        }

        [Fact]
        public async Task UpdateAndDelete_FullWorkflow()
        {
            // Arrange - Get an existing rasteplass
            var existingRasteplass = await _service.GetRasteplassByIdAsync(1);
            Assert.NotNull(existingRasteplass);
            
            // Modify some properties
            existingRasteplass.rasteplass_navn = "Updated Test Rasteplass";
            existingRasteplass.rasteplass_informasjon = "Updated Description";
            existingRasteplass.oppdatert = DateTime.Now;
            
            // Act - Update
            var updatedRasteplass = await _service.UpdateRasteplassAsync(existingRasteplass);
            
            // Assert - Update
            Assert.NotNull(updatedRasteplass);
            Assert.Equal("Updated Test Rasteplass", updatedRasteplass.rasteplass_navn);
            Assert.Equal("Updated Description", updatedRasteplass.rasteplass_informasjon);
            
            // Verify the update persisted
            var retrievedAfterUpdate = await _service.GetRasteplassByIdAsync(1);
            Assert.Equal("Updated Test Rasteplass", retrievedAfterUpdate?.rasteplass_navn);
            
            // Act - Delete
            var deleteResult = await _service.DeleteRasteplassAsync(1);
            
            // Assert - Delete
            Assert.True(deleteResult);
            
            // Verify deletion
            var retrievedAfterDelete = await _service.GetRasteplassByIdAsync(1);
            Assert.Null(retrievedAfterDelete);
            
            // Verify count decreased
            var allRasteplasserAfterDelete = await _service.GetRasteplasserAsync();
            Assert.Single(allRasteplasserAfterDelete);
        }

        // Clean up after test
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}