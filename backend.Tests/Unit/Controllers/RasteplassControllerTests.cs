using backend.Controllers;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using System.Text.Json;

namespace backend.Tests.Unit.Controllers
{
    public class RasteplassControllerTests
    {
        private readonly Mock<IRasteplassService> _mockService;
        private readonly Mock<ILogger<RasteplassController>> _mockLogger;
        private readonly RasteplassController _controller;

        public RasteplassControllerTests()
        {
            _mockService = new Mock<IRasteplassService>();
            _mockLogger = new Mock<ILogger<RasteplassController>>();
            _controller = new RasteplassController(_mockLogger.Object, _mockService.Object);
        }

        [Fact]
        public async Task GetRasteplasser_ShouldReturnOkResult_WithRasteplasser()
        {
            // Arrange
            var rasteplasser = new List<Rasteplass>
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

            _mockService
                .Setup(service => service.GetRasteplasserAsync())
                .ReturnsAsync(rasteplasser);

            // Act
            var result = await _controller.GetRasteplasser();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsAssignableFrom<IEnumerable<Rasteplass>>(okResult.Value);
            Assert.Equal(2, returnValue.Count());
            _mockService.Verify(s => s.GetRasteplasserAsync(), Times.Once);
        }

        [Fact]
        public async Task GetRasteplass_WhenRasteplassExists_ShouldReturnOkResult()
        {
            // Arrange
            int rasteplassId = 1;
            var rasteplass = new Rasteplass 
            { 
                rasteplass_id = rasteplassId, 
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

            _mockService
                .Setup(service => service.GetRasteplassByIdAsync(rasteplassId))
                .ReturnsAsync(rasteplass);

            // Act
            var result = await _controller.GetRasteplass(rasteplassId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Rasteplass>(okResult.Value);
            Assert.Equal(rasteplassId, returnValue.rasteplass_id);
            Assert.Equal("Test Rasteplass 1", returnValue.rasteplass_navn);
            _mockService.Verify(s => s.GetRasteplassByIdAsync(rasteplassId), Times.Once);
        }

        [Fact]
        public async Task GetRasteplass_WhenRasteplassDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int nonExistentId = 999;
            
            _mockService
                .Setup(service => service.GetRasteplassByIdAsync(nonExistentId))
                .ReturnsAsync((Rasteplass)null);

            // Act
            var result = await _controller.GetRasteplass(nonExistentId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            
            // Use a more direct approach to verify the error message
            var resultObject = notFoundResult.Value;
            Assert.NotNull(resultObject);
            
            // Convert to string and check if it contains the error message
            string resultString = resultObject.ToString();
            Assert.Contains($"Rasteplass med ID {nonExistentId} ble ikke funnet", resultString);
            
            _mockService.Verify(s => s.GetRasteplassByIdAsync(nonExistentId), Times.Once);
        }

        [Fact]
        public async Task GetRasteplasserByKommune_ShouldReturnOkResult_WithRasteplasser()
        {
            // Arrange
            string kommune = "Oslo";
            var rasteplasser = new List<Rasteplass>
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
                }
            };

            _mockService
                .Setup(service => service.GetRasteplasserByKommuneAsync(kommune))
                .ReturnsAsync(rasteplasser);

            // Act
            var result = await _controller.GetRasteplasserByKommune(kommune);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsAssignableFrom<IEnumerable<Rasteplass>>(okResult.Value);
            Assert.Single(returnValue);
            Assert.Equal(kommune, returnValue.First().geo_kommune);
            _mockService.Verify(s => s.GetRasteplasserByKommuneAsync(kommune), Times.Once);
        }

        [Fact]
        public async Task GetRasteplasserByFylke_ShouldReturnOkResult_WithRasteplasser()
        {
            // Arrange
            string fylke = "Vestland";
            var rasteplasser = new List<Rasteplass>
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

            _mockService
                .Setup(service => service.GetRasteplasserByFylkeAsync(fylke))
                .ReturnsAsync(rasteplasser);

            // Act
            var result = await _controller.GetRasteplasserByFylke(fylke);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsAssignableFrom<IEnumerable<Rasteplass>>(okResult.Value);
            Assert.Single(returnValue);
            Assert.Equal(fylke, returnValue.First().geo_fylke);
            _mockService.Verify(s => s.GetRasteplasserByFylkeAsync(fylke), Times.Once);
        }

        [Fact]
        public async Task CreateRasteplass_WithValidModel_ShouldReturnCreatedResult()
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

            _mockService
                .Setup(service => service.CreateRasteplassAsync(It.IsAny<Rasteplass>()))
                .ReturnsAsync(createdRasteplass);

            // Act
            var result = await _controller.CreateRasteplass(newRasteplass);

            // Assert
            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(nameof(_controller.GetRasteplass), createdResult.ActionName);
            Assert.Equal(createdRasteplass.rasteplass_id, createdResult.RouteValues["id"]);
            var returnValue = Assert.IsType<Rasteplass>(createdResult.Value);
            Assert.Equal(3, returnValue.rasteplass_id);
            Assert.Equal("New Rasteplass", returnValue.rasteplass_navn);
            _mockService.Verify(s => s.CreateRasteplassAsync(It.IsAny<Rasteplass>()), Times.Once);
        }

        [Fact]
        public async Task UpdateRasteplass_WithValidModel_ShouldReturnOkResult()
        {
            // Arrange
            int rasteplassId = 1;
            var rasteplassToUpdate = new Rasteplass
            {
                rasteplass_id = rasteplassId,
                vegvesen_id = 1,
                geo_kommune = "Oslo",
                geo_fylke = "Oslo",
                rasteplass_navn = "Updated Rasteplass",
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

            _mockService
                .Setup(service => service.UpdateRasteplassAsync(It.IsAny<Rasteplass>()))
                .ReturnsAsync(rasteplassToUpdate);

            // Act
            var result = await _controller.UpdateRasteplass(rasteplassId, rasteplassToUpdate);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<Rasteplass>(okResult.Value);
            Assert.Equal("Updated Rasteplass", returnValue.rasteplass_navn);
            Assert.Equal("Updated Description", returnValue.rasteplass_informasjon);
            _mockService.Verify(s => s.UpdateRasteplassAsync(It.IsAny<Rasteplass>()), Times.Once);
        }

         [Fact]
        public async Task UpdateRasteplass_WithMismatchingIds_ShouldReturnBadRequest()
        {
            // Arrange
            int rasteplassId = 1;
            var rasteplassToUpdate = new Rasteplass
            {
                rasteplass_id = 2, // Different ID than in the route
                vegvesen_id = 2,
                geo_kommune = "Oslo",
                geo_fylke = "Oslo",
                rasteplass_navn = "Updated Rasteplass",
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

            // Act
            var result = await _controller.UpdateRasteplass(rasteplassId, rasteplassToUpdate);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            
            // Use a more direct approach to verify the error message
            var resultObject = badRequestResult.Value;
            Assert.NotNull(resultObject);
            
            // Convert to string and check if it contains the error message
            string resultString = resultObject.ToString();
            Assert.Contains("ID i path og body må stemme overens", resultString);
            
            _mockService.Verify(s => s.UpdateRasteplassAsync(It.IsAny<Rasteplass>()), Times.Never);
        }

        [Fact]
        public async Task UpdateRasteplass_WhenRasteplassDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int nonExistentId = 999;
            var rasteplassToUpdate = new Rasteplass
            {
                rasteplass_id = nonExistentId,
                vegvesen_id = 999,
                geo_kommune = "Oslo",
                geo_fylke = "Oslo",
                rasteplass_navn = "Updated Rasteplass",
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

            _mockService
                .Setup(service => service.UpdateRasteplassAsync(It.IsAny<Rasteplass>()))
                .ReturnsAsync((Rasteplass)null);

            // Act
            var result = await _controller.UpdateRasteplass(nonExistentId, rasteplassToUpdate);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            
            // Use a more direct approach to verify the error message
            var resultObject = notFoundResult.Value;
            Assert.NotNull(resultObject);
            
            // Convert to string and check if it contains the error message
            string resultString = resultObject.ToString();
            Assert.Contains($"Rasteplass med ID {nonExistentId} ble ikke funnet", resultString);
            
            _mockService.Verify(s => s.UpdateRasteplassAsync(It.IsAny<Rasteplass>()), Times.Once);
        }

        [Fact]
        public async Task DeleteRasteplass_WhenRasteplassExists_ShouldReturnNoContent()
        {
            // Arrange
            int rasteplassId = 1;
            
            _mockService
                .Setup(service => service.DeleteRasteplassAsync(rasteplassId))
                .ReturnsAsync(true);

            // Act
            var result = await _controller.DeleteRasteplass(rasteplassId);

            // Assert
            Assert.IsType<NoContentResult>(result);
            _mockService.Verify(s => s.DeleteRasteplassAsync(rasteplassId), Times.Once);
        }

        [Fact]
        public async Task DeleteRasteplass_WhenRasteplassDoesNotExist_ShouldReturnNotFound()
        {
            // Arrange
            int nonExistentId = 999;
            
            _mockService
                .Setup(service => service.DeleteRasteplassAsync(nonExistentId))
                .ReturnsAsync(false);

            // Act
            var result = await _controller.DeleteRasteplass(nonExistentId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            
            // Use a more direct approach to verify the error message
            var resultObject = notFoundResult.Value;
            Assert.NotNull(resultObject);
            
            // Convert to string and check if it contains the error message
            string resultString = resultObject.ToString();
            Assert.Contains($"Rasteplass med ID {nonExistentId} ble ikke funnet", resultString);
            
            _mockService.Verify(s => s.DeleteRasteplassAsync(nonExistentId), Times.Once);
        }
        
        [Fact]
        public void TestException_ShouldThrowException()
        {
            // Act & Assert
            var exception = Assert.Throws<Exception>(() => _controller.TestException());
            Assert.Equal("Test av ExceptionHandlingMiddleware", exception.Message);
        }
    }
}