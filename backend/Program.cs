
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Repositories;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Get connectionstring from .env

var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ??
                      builder.Configuration.GetConnectionString("DefaultConnection");

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddDbContext<RasteplassDbContext>(options =>
{
    var serverVersion = new MySqlServerVersion(new Version(8, 0, 31));
    options.UseMySql(connectionString, serverVersion);
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

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
app.UseAuthorization();
app.MapControllers();
app.Run();
