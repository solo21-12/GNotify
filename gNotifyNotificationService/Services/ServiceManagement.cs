using gNotifyNotificationService.Models;
using Quartz;

namespace gNotifyNotificationService.Services
{
    [DisallowConcurrentExecution]
    public class ServiceManagement : IJob
    {
        private readonly NotificationService _notificationService;
        private readonly ILogger<ServiceManagement> _logger;

        public ServiceManagement(NotificationService notificationService, ILogger<ServiceManagement> logger)
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            // await UpdateNotification();
            
            _logger.LogInformation("Operating {UtcNow}", DateTime.UtcNow);
        }

      private async Task UpdateNotification()
    {
        try
        {
            var allVehicles = await _notificationService.GetVehicle();

            foreach (var vehicle in allVehicles)
            {
                await CheckRenewalAndNotify(vehicle.InsuranceRenewalDate, "Insurance", vehicle);
                await CheckRenewalAndNotify(vehicle.BoloRenewalData, "Bolo", vehicle);
                await CheckRenewalAndNotify(vehicle.RoadFundRenewalData, "Road Fund", vehicle);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while checking renewals and sending notifications.");
        }
    }

    private async Task CheckRenewalAndNotify(DateTime renewalDate, string serviceName, Vehicle vehicle)
    {
        var currentYearDeadline = renewalDate.AddYears(1);
        TimeSpan remainingDays = currentYearDeadline - DateTime.Now;

        if (remainingDays.Days == 7)
        {
            await UpdateDataBase(vehicle, serviceName);
        }

        _logger.LogInformation($"Days remaining until the {serviceName} deadline for VehicleId {vehicle.VehicleId}: {remainingDays.Days} days");
    }

    private async Task UpdateDataBase(Vehicle vehicle, string serviceName)
    {
        try
        {
            var result = await _notificationService.GetNotificationById(vehicle.VehicleId);
            if (result == null)
            {
                var newNotification = new Notification
                {
                    VehicleId = vehicle.VehicleId,
                    UserId = vehicle.UserId,
                    Message = $"Your vehicle's {serviceName} deadline is approaching in 7 days."
                };
                await _notificationService.CreateNotification(newNotification);

                _logger.LogInformation($"Notification created for VehicleId: {vehicle.VehicleId}, UserId: {vehicle.UserId}, Service: {serviceName}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating the database.");
        }
    }
}
}