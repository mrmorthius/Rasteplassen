using backend.Models;
using backend.Services;
using Microsoft.Extensions.Configuration;
using Moq;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Xunit;

namespace backend.Tests.Unit.Services
{
    public class AuthServiceTests
    {
        private readonly Mock<IConfiguration> _mockConfiguration;
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            // Set up mock configuration
            _mockConfiguration = new Mock<IConfiguration>();
            _mockConfiguration.Setup(c => c["JWT_KEY"]).Returns("test_super_secret_key_at_least_32_chars_long_for_security");
            _mockConfiguration.Setup(c => c["JWT_ISSUER"]).Returns("test_issuer");
            _mockConfiguration.Setup(c => c["JWT_AUDIENCE"]).Returns("test_audience");
            _mockConfiguration.Setup(c => c["JWT_EXPIRES_MINUTES"]).Returns("60");

            _authService = new AuthService(_mockConfiguration.Object);
        }

        [Fact]
        public void CreateToken_ShouldReturnValidToken()
        {
            // Arrange
            var user = new User
            {
                BrukerId = 1,
                Brukernavn = "testuser",
                Email = "test@example.com",
                Passord = "hashedpassword123",
                Laget = DateTime.Now
            };

            // Act
            var token = _authService.CreateToken(user);

            // Assert
            Assert.NotNull(token);
            Assert.NotEmpty(token);

            // Verify the token can be parsed
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            // Verify claims
            Assert.Equal(user.Email, jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value);
            Assert.Equal(user.BrukerId.ToString(), jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
            Assert.Equal(user.Brukernavn, jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value);
            
            // Verify issuer and audience
            Assert.Equal("test_issuer", jwtToken.Issuer);
            Assert.Equal("test_audience", jwtToken.Audiences.FirstOrDefault());

            // Don't check the exact expiration time - just verify the token isn't expired
            Assert.True(jwtToken.ValidTo > DateTime.UtcNow, "Token should not be expired");
        }

        [Fact]
        public void CreateToken_WithMissingJwtKey_ShouldThrowException()
        {
            // Arrange
            var mockConfigWithoutKey = new Mock<IConfiguration>();
            mockConfigWithoutKey.Setup(c => c["JWT_KEY"]).Returns((string)null);
            var authService = new AuthService(mockConfigWithoutKey.Object);

            var user = new User
            {
                BrukerId = 1,
                Brukernavn = "testuser",
                Email = "test@example.com",
                Passord = "hashedpassword123",
                Laget = DateTime.Now
            };

            // Act & Assert
            var exception = Assert.Throws<InvalidOperationException>(() => authService.CreateToken(user));
            Assert.Equal("JWT_KEY er ikke satt i miljøvariablene", exception.Message);
        }

        [Fact]
        public void CreateToken_WithDefaultIssuerAndAudience_ShouldUseDefaults()
        {
            // Arrange
            var mockConfigWithoutIssuerAudience = new Mock<IConfiguration>();
            mockConfigWithoutIssuerAudience.Setup(c => c["JWT_KEY"]).Returns("test_super_secret_key_at_least_32_chars_long_for_security");
            mockConfigWithoutIssuerAudience.Setup(c => c["JWT_ISSUER"]).Returns((string)null);
            mockConfigWithoutIssuerAudience.Setup(c => c["JWT_AUDIENCE"]).Returns((string)null);
            
            var authService = new AuthService(mockConfigWithoutIssuerAudience.Object);

            var user = new User
            {
                BrukerId = 1,
                Brukernavn = "testuser",
                Email = "test@example.com",
                Passord = "hashedpassword123",
                Laget = DateTime.Now
            };

            // Act
            var token = authService.CreateToken(user);

            // Assert
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            // Verify default issuer and audience
            Assert.Equal("rasteplassen-app", jwtToken.Issuer);
            Assert.Equal("rasteplassen-app", jwtToken.Audiences.FirstOrDefault());
        }

        [Fact]
        public void CreateToken_WithCustomExpiration_ShouldHaveLongerLifetimeThanDefault()
        {
            // Arrange
            // Create a token with default expiration (60 minutes)
            var user = new User
            {
                BrukerId = 1,
                Brukernavn = "testuser",
                Email = "test@example.com",
                Passord = "hashedpassword123",
                Laget = DateTime.Now
            };
            
            var defaultToken = _authService.CreateToken(user);
            var handler = new JwtSecurityTokenHandler();
            var defaultJwtToken = handler.ReadJwtToken(defaultToken);
            var defaultExpiry = defaultJwtToken.ValidTo;
            
            // Create a token with extended expiration (120 minutes)
            var mockConfigWithLongerExpiration = new Mock<IConfiguration>();
            mockConfigWithLongerExpiration.Setup(c => c["JWT_KEY"]).Returns("test_super_secret_key_at_least_32_chars_long_for_security");
            mockConfigWithLongerExpiration.Setup(c => c["JWT_EXPIRES_MINUTES"]).Returns("120"); // 2 hours
            
            var authServiceWithLongerExpiry = new AuthService(mockConfigWithLongerExpiration.Object);
            var longerToken = authServiceWithLongerExpiry.CreateToken(user);
            var longerJwtToken = handler.ReadJwtToken(longerToken);
            var longerExpiry = longerJwtToken.ValidTo;
            
            // Assert - verify the token with longer expiration actually expires later
            Assert.True(longerExpiry > defaultExpiry, 
                $"Token with longer expiration should expire later than default token. Default: {defaultExpiry}, Longer: {longerExpiry}");
        }
    }
}