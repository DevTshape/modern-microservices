namespace orders.Models
{
    public class OrderModel
    {
        public long Id { get; set; }
        public int UserId { get; set; }
        public bool IsPaid { get; set; }
    }
}