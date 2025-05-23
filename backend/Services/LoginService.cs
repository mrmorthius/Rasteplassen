using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using backend.Models;
using backend.Repositories;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        private readonly IAuthService _authService;

        public LoginService(ILoginRepository loginRepository, IAuthService authService)
        {
            _authService = authService;
            _loginRepository = loginRepository;
        }

        // Check email and password
        public IEnumerable<User> GetUsers() => _loginRepository.GetUsers().ToList();
        public async Task<User?> CheckUser(string email, string password)
        {
            // Check for missing input
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            // Check for valid user
            var user = await _loginRepository.GetUsers()
                .FirstOrDefaultAsync(u => u.Email == email);

            // Return if no user
            if (user == null)
                return null;

            // Check for valid password
            if (!VerifyPassword(password, user.Passord))
                return null;

            // If valid user and password
            return user;
        }

        public bool VerifyPassword(string password, string hashedPassword)
        {
            // Check if the password matches the hashed password
            if (password == null) throw new ArgumentNullException("password not supplied");
            if (hashedPassword == null) throw new ArgumentNullException("No password in db");

            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        // Method to create password hash
        public string HashPassword(string password)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));

            // Generer en hash fra passordet
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public string CreateToken(User user)
        {
            var token = _authService.CreateToken(user);
            return token;
        }
    }
}