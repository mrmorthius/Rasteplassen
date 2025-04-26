using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IUserService _userService;

    public UserController(ILogger<UserController> logger, IUserService userService)

    {
        _userService = userService;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        _logger.LogInformation("Henter brukere: {Time}", DateTime.UtcNow);
        var users = _userService.GetUsers();

        return Ok(users);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Check email and password
        var user = await _userService.CheckUser(request.Email, request.Password);

        if (user == null)
            return Unauthorized(new { message = "Invalid email or password" });

        // Create JWT token
        var token = _userService.CreateToken(user);

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

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] string password)
    {
        string hashedPassword = _userService.HashPassword(password);

        // Return user info and token
        return Ok(hashedPassword);
    }
}
