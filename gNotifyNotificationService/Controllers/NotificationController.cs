using gNotifyNotificationService.Services;
using Microsoft.AspNetCore.Mvc;

namespace gNotifyNotificationService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotificationController:ControllerBase
{
    private readonly NotificationService _notificationService;

    public NotificationController(NotificationService notificationService)
    {
        _notificationService = notificationService;
    }
    
}