using backend.Models;
using backend.Repositories;
using backend.Services;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace backend.Tests.Unit.Services
{
    public class RasteplassServiceTests
    {
        private readonly Mock<IRasteplassRepository> _mockRepository;
        private readonly Mock<ILogger<RasteplassService>> _mockLogger;
        private readonly RasteplassService _service;

        public RasteplassServiceTests()
        {
            _mockRepository = new Mock<IRasteplassRepository>();
            _mockLogger = new Mock<ILogger<RasteplassService>>();
            _service = new RasteplassService(_mockRepository.Object, _mockLogger.Object);
        }

        [Fact]
        public async Task GetRasteplasserAsync_ShouldReturnAllRasteplasser()
        {
            // Arrange
            var expectedRasteplasser = new List<Rasteplass>
            {
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
            };

            _mockRepository
                .Setup(repo => repo.GetAllAsync())
                .ReturnsAsync(expectedRasteplasser);

            // Act
            var result = await _service.GetRasteplasserAsync();

            // Assert
            Assert.Equal(2, result.Count());
            Assert.Collection(result,
                item => Assert.Equal("Test Rasteplass 1", item.rasteplass_navn),
                item => Assert.Equal("Test Rasteplass 2", item.rasteplass_navn)
            );
            _mockRepository.Verify(repo => repo.GetAllAsync(), Times.Once);
        }

        [Fact]
        public async Task GetRasteplassByIdAsync_WhenRasteplassExists_ShouldReturnRasteplass()
        {
            // Arrange
            var expectedRasteplass = new Rasteplass 
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
            };

            _mockRepository
                .Setup(repo => repo.GetByIdAsync(1))
                .ReturnsAsync(expectedRasteplass);

            // Act
            var result = await _service.GetRasteplassByIdAsync(1);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Test Rasteplass 1", result.rasteplass_navn);
            _mockRepository.Verify(repo => repo.GetByIdAsync(1), Times.Once);
        }

        [Fact]
        public async Task GetRasteplassByIdAsync_WhenRasteplassDoesNotExist_ShouldReturnNull()
        {
            // Arrange
            _mockRepository
                .Setup(repo => repo.GetByIdAsync(999))
                .ReturnsAsync((Rasteplass)null);

            // Act
            var result = await _service.GetRasteplassByIdAsync(999);

            // Assert
            Assert.Null(result);
            _mockRepository.Verify(repo => repo.GetByIdAsync(999), Times.Once);
        }

        [Fact]
        public async Task GetRasteplasserByKommuneAsync_ShouldReturnRasteplasserInKommune()
        {
            // Arrange
            string kommune = "Oslo";
            var expectedRasteplasser = new List<Rasteplass>
            {
                new Rasteplass 
                { 
                    rasteplass_id = 1, 
                    vegvesen_id = 1,
                    geo_kommune = kommune,
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
                    rasteplass_id = 3, 
                    vegvesen_id = 3,
                    geo_kommune = kommune,
                    geo_fylke = "Oslo",
                    rasteplass_navn = "Test Rasteplass 3",
                    rasteplass_type = "Type1",
                    rasteplass_lat = 59.9539M,
                    rasteplass_long = 10.7822M,
                    rasteplass_toalett = true,
                    rasteplass_tilgjengelig = true,
                    rasteplass_informasjon = "Test Description 3",
                    rasteplass_renovasjon = "Ja",
                    laget = DateTime.Now,
                    oppdatert = DateTime.Now
                }
            };

            _mockRepository
                .Setup(repo => repo.GetByKommuneAsync(kommune))
                .ReturnsAsync(expectedRasteplasser);

            // Act
            var result = await _service.GetRasteplasserByKommuneAsync(kommune);

            // Assert
            Assert.Equal(2, result.Count());
            Assert.True(result.All(r => r.geo_kommune == kommune));
            _mockRepository.Verify(repo => repo.GetByKommuneAsync(kommune), Times.Once);
        }

        [Fact]
        public async Task GetRasteplasserByFylkeAsync_ShouldReturnRasteplasserInFylke()
        {
            // Arrange
            string fylke = "Vestland";
            var expectedRasteplasser = new List<Rasteplass>
            {
                new Rasteplass 
                { 
                    rasteplass_id = 2, 
                    vegvesen_id = 2,
                    geo_kommune = "Bergen",
                    geo_fylke = fylke,
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
            };

            _mockRepository
                .Setup(repo => repo.GetByFylkeAsync(fylke))
                .ReturnsAsync(expectedRasteplasser);

            // Act
            var result = await _service.GetRasteplasserByFylkeAsync(fylke);

            // Assert
            Assert.Single(result);
            Assert.True(result.All(r => r.geo_fylke == fylke));
            _mockRepository.Verify(repo => repo.GetByFylkeAsync(fylke), Times.Once);
        }

        [Fact]
        public async Task CreateRasteplassAsync_ShouldReturnCreatedRasteplass()
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

            var createdRasteplass = new Rasteplass
            {
                rasteplass_id = 3,
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

            _mockRepository
                .Setup(repo => repo.CreateAsync(It.IsAny<Rasteplass>()))
                .ReturnsAsync(createdRasteplass);

            // Act
            var result = await _service.CreateRasteplassAsync(newRasteplass);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, result.rasteplass_id);
            Assert.Equal("New Rasteplass", result.rasteplass_navn);
            _mockRepository.Verify(repo => repo.CreateAsync(It.IsAny<Rasteplass>()), Times.Once);
        }
        
        [Fact]
        public async Task UpdateRasteplassAsync_ShouldReturnUpdatedRasteplass()
        {
            // Arrange
            var updatedRasteplass = new Rasteplass
            {
                rasteplass_id = 1,
                vegvesen_id = 1,
                geo_kommune = "Oslo",
                geo_fylke = "Oslo",
                rasteplass_navn = "Updated Name",
                rasteplass_type = "Type1",
                rasteplass_lat = 59.9139M,
                rasteplass_long = 10.7522M,
                rasteplass_toalett = false,
                rasteplass_tilgjengelig = true,
                rasteplass_informasjon = "Updated Description",
                rasteplass_renovasjon = "Nei",
                laget = DateTime.Now.AddDays(-10),
                oppdatert = DateTime.Now
            };
            
            _mockRepository
                .Setup(repo => repo.UpdateAsync(It.IsAny<Rasteplass>()))
                .ReturnsAsync(updatedRasteplass);
                
            // Act
            var result = await _service.UpdateRasteplassAsync(updatedRasteplass);
            
            // Assert
            Assert.NotNull(result);
            Assert.Equal("Updated Name", result.rasteplass_navn);
            Assert.Equal("Updated Description", result.rasteplass_informasjon);
            Assert.False(result.rasteplass_toalett);
            Assert.Equal("Nei", result.rasteplass_renovasjon);
            _mockRepository.Verify(repo => repo.UpdateAsync(It.IsAny<Rasteplass>()), Times.Once);
        }
        
        [Fact]
        public async Task DeleteRasteplassAsync_WhenSuccessful_ShouldReturnTrue()
        {
            // Arrange
            int rasteplassId = 1;
            
            _mockRepository
                .Setup(repo => repo.DeleteAsync(rasteplassId))
                .ReturnsAsync(true);
                
            // Act
            var result = await _service.DeleteRasteplassAsync(rasteplassId);
            
            // Assert
            Assert.True(result);
            _mockRepository.Verify(repo => repo.DeleteAsync(rasteplassId), Times.Once);
        }
        
        [Fact]
        public async Task DeleteRasteplassAsync_WhenUnsuccessful_ShouldReturnFalse()
        {
            // Arrange
            int nonExistentRasteplassId = 999;
            
            _mockRepository
                .Setup(repo => repo.DeleteAsync(nonExistentRasteplassId))
                .ReturnsAsync(false);
                
            // Act
            var result = await _service.DeleteRasteplassAsync(nonExistentRasteplassId);
            
            // Assert
            Assert.False(result);
            _mockRepository.Verify(repo => repo.DeleteAsync(nonExistentRasteplassId), Times.Once);
        }
    }
}