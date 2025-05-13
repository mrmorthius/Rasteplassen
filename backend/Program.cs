
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Get connectionstring from .env

var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ??
                      builder.Configuration.GetConnectionString("DefaultConnection");

var corsOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>() ??
                  new[] { "http://localhost:3000" };

// Konfigurer CORS basert på verdiene fra appsettings
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        policy =>
        {
            policy.WithOrigins(corsOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddScoped<IRasteplassForslagRepository, RasteplassForslagRepository>();
builder.Services.AddScoped<IRasteplassForslagService, RasteplassForslagService>();
builder.Services.AddScoped<IRasteplassRepository, RasteplassRepository>();
builder.Services.AddScoped<IRasteplassService, RasteplassService>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddDbContext<RasteplassDbContext>(options =>
{
    var serverVersion = new MySqlServerVersion(new Version(8, 0, 31));
    options.UseMySql(connectionString, serverVersion);
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JWT_ISSUER"],
        ValidAudience = builder.Configuration["JWT_AUDIENCE"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["JWT_KEY"]))
    };
});

builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Rasteplassen");
});
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
