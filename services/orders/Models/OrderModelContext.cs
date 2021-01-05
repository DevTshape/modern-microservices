using Microsoft.EntityFrameworkCore;

namespace orders.Models
{
    public class OrderModelContext : DbContext
    {
        public OrderModelContext(DbContextOptions<OrderModelContext> options)
            : base(options)
        {
        }

        public DbSet<OrderModel> Orders { get; set; }
    }
}