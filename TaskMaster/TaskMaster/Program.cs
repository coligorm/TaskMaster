using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using TaskMaster.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("TaskManagerConnection")
    ));

// Register Swagger
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Task Manager API",
        Version = "v1",
        Description = "A simple API for managing tasks"
    });
});

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy
            .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // Apply migrations at startup during development
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<TaskDbContext>();
        dbContext.Database.Migrate();
    }
}

app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();