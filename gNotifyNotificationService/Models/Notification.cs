using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace gNotifyNotificationService.Models;

public class Notification
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string? UserId { get; set; }
    public string? Message { get; set; }
    public string? VehicleId { get; set; }
    public bool Seen { get; set; } = false;
    public DateTime CreatedAt { get; set; }   = DateTime.Now;

}