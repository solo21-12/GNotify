using Quartz;

namespace gNotifyNotificationService.Services;

public class LoggingBackGroundJob: IJob
{
    private readonly ILogger<LoggingBackGroundJob> _logger;

    public LoggingBackGroundJob(ILogger<LoggingBackGroundJob> logger)
    {
        _logger = logger;
    }

    public Task Execute(IJobExecutionContext context)
    {
        _logger.LogInformation("{UtcNow}",DateTime.UtcNow);

        return Task.CompletedTask;
    }
}