using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

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

            // Add some seed data with static values
            modelBuilder.Entity<Task>().HasData(
                new Task
                {
                    Id = 1,
                    Title = "Complete the project setup",
                    Description = "Set up the initial project structure and dependencies",
                    DueDate = new DateTime(2025, 4, 8), // Static value
                    Priority = Priority.High,
                    IsCompleted = false
                },
                new Task
                {
                    Id = 2,
                    Title = "Write unit tests",
                    Description = "Create comprehensive test suite for the API",
                    DueDate = new DateTime(2025, 4, 15), // Static value
                    Priority = Priority.Medium,
                    IsCompleted = false
                }
            );
        }
    }
}