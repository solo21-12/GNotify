using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VehicleServices.Dtos
{
    public class NotificationDTO
{
    public string NotificationType { get; set; }
    public DateTime Deadline { get; set; }
    public bool Status { get; set; }
}
}