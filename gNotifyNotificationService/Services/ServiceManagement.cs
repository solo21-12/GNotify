namespace gNotifyNotificationService.Services
{
    public class ServiceManagement : IServiceManagementService
    {
        private readonly NotificationService _notificationService;
        private readonly ILogger<ServiceManagement> _logger;

        public ServiceManagement(NotificationService notificationService, ILogger<ServiceManagement> logger)
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        public async Task SendEmail()
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

        public void UpdateDataBase()
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