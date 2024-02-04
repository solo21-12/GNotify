using gNotifyNotificationService.Dto;
using gNotifyNotificationService.Services;
using Microsoft.AspNetCore.Authorization;
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

    [Authorize]
    [HttpGet]
    [Route("user-notification/{userId}")]
    public async Task<IActionResult> GetUserNotifications(string userId)
    {
        var notifications = await _notificationService.GetUserNotifications(userId);

        if (notifications.Any())
        {
            return Ok(notifications);
        }
        return NotFound();
    }
    
    [Authorize]
    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetNotifications(string id)
    {
        var notification = await _notificationService.GetNotificationById(id);

        if (notification != null)
        {
            return Ok(notification);
        }
        return NotFound();
    }
    
    [Authorize]
    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteNotifications(string id)
    {
         await _notificationService.DeleteNotification(id);
         
        return NoContent();
    }
    
    [Authorize]
    [HttpPatch]
    [Route("{id}")]
    public async Task<IActionResult> UpdateNotifications(string id,[FromBody] PatchRequest request)
    {
        await _notificationService.UpdateNotification(id,request);
         
        return NoContent();
    }
    
}