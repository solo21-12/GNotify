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
            await SendEmail();
            UpdateDataBase();

            _logger.LogInformation("Operating {UtcNow}", DateTime.UtcNow);
        }

        private async Task SendEmail()
        {
            try
            {
                var allVehicles = await _notificationService.GetVehicle();

                foreach (var vehicle in allVehicles)
                {
                    var lastYearDeadline = vehicle.BoloRenewalData;
                    var currentYearDeadline = lastYearDeadline.AddYears(1);

                    TimeSpan remainingDays = currentYearDeadline - DateTime.Now;

                    _logger.LogInformation($"Days remaining until the deadline: {remainingDays.Days} days");
                }

                _logger.LogInformation($"Send email {DateTime.Now:yyyy-M-d dddd}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while sending emails.");
            }
        }

        private void UpdateDataBase()
        {
            try
            {
                _logger.LogInformation($"Update database {DateTime.Now:yyyy-M-d dddd}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while updating the database.");
            }
        }
    }
}