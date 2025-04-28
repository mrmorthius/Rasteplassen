using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Lager JWT token
        public string CreateToken(User user)
        {
            var jwtKey = _configuration["JWT_KEY"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new InvalidOperationException("JWT_KEY er ikke satt i miljøvariablene");
            }
            var keyBytes = Encoding.UTF8.GetBytes(jwtKey);
            var key = new SymmetricSecurityKey(keyBytes);

            // Opprett signing credentials
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.BrukerId.ToString()),
                new Claim(ClaimTypes.Name, user.Brukernavn)
            };

            var issuer = _configuration["JWT_ISSUER"] ?? "rasteplassen-app";
            var audience = _configuration["JWT_AUDIENCE"] ?? "rasteplassen-app";

            int expiresMinutes = 60;
            if (int.TryParse(_configuration["JWT_EXPIRES_MINUTES"], out int minutes))
            {
                expiresMinutes = minutes;
            }

            // Opprett token
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expiresMinutes),
                signingCredentials: creds
            );

            // Returner token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
