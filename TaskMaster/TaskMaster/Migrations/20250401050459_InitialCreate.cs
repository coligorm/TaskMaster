using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskMaster.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "CreatedAt", "Description", "DueDate", "IsCompleted", "Priority", "Title" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 4, 1, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(8049), "Set up the initial project structure and dependencies", new DateTime(2025, 4, 8, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(8893), false, 2, "Complete the project setup" },
                    { 2, new DateTime(2025, 4, 1, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(9674), "Create comprehensive test suite for the API", new DateTime(2025, 4, 15, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(9676), false, 1, "Write unit tests" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
