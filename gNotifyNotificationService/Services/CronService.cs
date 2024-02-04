using Quartz;

namespace gNotifyNotificationService.Services
{
    [DisallowConcurrentExecution]
    public static class CronService
    {
        public static void AddNotification(this IServiceCollection service)
        {
            service.AddQuartz(options =>
            {
                options.UseMicrosoftDependencyInjectionJobFactory();

                options
                    .AddJob<ServiceManagement>(JobKey.Create(nameof(ServiceManagement)))
                    .AddTrigger(trigger => trigger
                        .ForJob(JobKey.Create(nameof(ServiceManagement)))
                        .WithSimpleSchedule(schedule => schedule.WithIntervalInSeconds(5).RepeatForever()));
            });

            service.AddQuartzHostedService(options =>
            {
                options.WaitForJobsToComplete = true;
            });
        }
    }
}