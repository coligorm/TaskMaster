using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TaskMaster.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2025, 4, 1, 5, 13, 36, 523, DateTimeKind.Utc).AddTicks(1907), new DateTime(2025, 4, 8, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2025, 4, 1, 5, 13, 36, 523, DateTimeKind.Utc).AddTicks(3509), new DateTime(2025, 4, 15, 0, 0, 0, 0, DateTimeKind.Unspecified) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2025, 4, 1, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(8049), new DateTime(2025, 4, 8, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(8893) });

            migrationBuilder.UpdateData(
                table: "Tasks",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "DueDate" },
                values: new object[] { new DateTime(2025, 4, 1, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(9674), new DateTime(2025, 4, 15, 5, 4, 58, 711, DateTimeKind.Utc).AddTicks(9676) });
        }
    }
}
