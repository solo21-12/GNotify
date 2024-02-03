using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace VehicleServices.model
{
    // Notification.cs
public class Notification
{
    public ObjectId Id { get; set; }
    public string NotificationType { get; set; }
    public DateTime Deadline { get; set; }
    public bool Status { get; set; }
    public ObjectId VehicleId { get; set; }
    // Add other notification-related properties as needed
}
}