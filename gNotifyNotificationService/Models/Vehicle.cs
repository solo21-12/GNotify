using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace gNotifyNotificationService.Models;

public class Vehicle
{
    [BsonId]
    [BsonRepresentation((BsonType.ObjectId))]
    public string? VehicleId { get; set; }
    public string? UserId { get; set; }
    public string? PlateNumber { get; set; }
    public DateTime InsuranceRenewalDate { get; set; }
    public DateTime BoloRenewalData { get; set; }
    public DateTime RoadFundRenewalData { get; set; } 
}