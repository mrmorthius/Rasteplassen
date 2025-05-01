using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using backend.Services;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly ILogger<LoginController> _logger;
    private readonly ILoginService _loginService;
    private readonly IWebHostEnvironment _environment;

    public LoginController(ILogger<LoginController> logger, ILoginService loginService, IWebHostEnvironment environment)

    {
        _loginService = loginService;
        _logger = logger;
        _environment = environment;
    }

    [HttpGet("brukere")]
    public IActionResult GetUsers()
    {
        _logger.LogInformation("Henter brukere: {Time}", DateTime.UtcNow);
        var users = _loginService.GetUsers();

        return Ok(users);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Check email and password
        var user = await _loginService.CheckUser(request.Email, request.Password);

        if (user == null)
            return Unauthorized(new { message = "Invalid email or password" });

        // Create JWT token
        var token = _loginService.CreateToken(user);

        // Return user info and token
        return Ok(new
        {
            Id = user.BrukerId,
            Email = user.Email,
            Name = user.Brukernavn,
            Laget = user.Laget,
            Token = token
        });
    }

    [HttpGet("validateJWT")]
    [Authorize]
    public IActionResult VerifyToken()
    {
        // Hent brukerinfo fra token
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var userName = User.FindFirst(ClaimTypes.Name)?.Value;
        var email = User.FindFirst(ClaimTypes.Email)?.Value;

        return Ok(new
        {
            authenticated = true,
            userId,
            userName,
            email
        });
    }

    [HttpPost("validateJWTString")]
    public IActionResult ValidateToken([FromBody] string token)
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }

        if (string.IsNullOrEmpty(token))
        {
            return BadRequest(new { message = "Token ikke oppgitt" });
        }

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY"));

            // Oppsett for validering
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "rasteplassen-app",
                ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "rasteplassen-app",
                IssuerSigningKey = new SymmetricSecurityKey(key)
            };

            // Valider token
            var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);

            Console.WriteLine("Alle claims i tokenet:");
            foreach (var claim in principal.Claims)
            {
                Console.WriteLine($"Type: {claim.Type}, Value: {claim.Value}");
            }

            // Hent claims fra token
            var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = principal.FindFirst(ClaimTypes.Name)?.Value;
            var email = principal.FindFirst(ClaimTypes.Email)?.Value;

            return Ok(new
            {
                isValid = true,
                userId,
                userName,
                email
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                isValid = false,
                message = "Ugyldig token",
                error = ex.Message
            });
        }
    }

    [HttpPost("createHashedPassword")]
    public async Task<IActionResult> Create([FromBody] string password)
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }
        string hashedPassword = _loginService.HashPassword(password);

        // Return user info and token
        return Ok(hashedPassword);
    }
}
