using Microsoft.EntityFrameworkCore;
using TaskMaster.Models;
using Task = TaskMaster.Models.Task;

namespace TaskMaster.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options)
        {
        }

        public DbSet<Task> Tasks { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the Task entity
            modelBuilder.Entity<Task>()
                .Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Task>()
                .Property(t => t.Description)
                .HasMaxLength(500);

            // Add some seed data
            modelBuilder.Entity<Task>().HasData(
                new Task
                {
                    Id = 1,
                    Title = "Complete the project setup",
                    Description = "Set up the initial project structure and dependencies",
                    DueDate = DateTime.UtcNow.AddDays(7),
                    Priority = Priority.High,
                    IsCompleted = false
                },
                new Task
                {
                    Id = 2,
                    Title = "Write unit tests",
                    Description = "Create comprehensive test suite for the API",
                    DueDate = DateTime.UtcNow.AddDays(14),
                    Priority = Priority.Medium,
                    IsCompleted = false
                }
            );
        }
    }
}