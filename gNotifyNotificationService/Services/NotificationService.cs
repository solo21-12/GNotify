using gNotifyNotificationService.Config;
using gNotifyNotificationService.Dto;
using gNotifyNotificationService.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace gNotifyNotificationService.Services;

public class NotificationService
{
    private readonly IMongoCollection<Vehicle> _vehicleCollection;
    private readonly IMongoCollection<Notification> _notificationCollection;

    public NotificationService(IOptions<DatabaseSettings> options)
    {
        var mongoClient = new MongoClient(options.Value.ConnectionStrings);
        var mongoDb = mongoClient.GetDatabase(options.Value.Database);
        _vehicleCollection = mongoDb.GetCollection<Vehicle>(options.Value.Collection);
        _notificationCollection = mongoDb.GetCollection<Notification>(options.Value.NotificationCollection);
    }
    
    public async Task<List<Vehicle>> GetVehicle()
    {
        var allVehicles = await _vehicleCollection.Find(_ => true).ToListAsync();
        return allVehicles;
    }

    public async Task CreateNotification(Notification notification)
    {
        await _notificationCollection.InsertOneAsync(notification);
    }
    
    public async Task<Notification> GetNotificationById(string id)
    {
        //This returns the detail about a single notification
        var result = await _notificationCollection.Find(v => v.Id == id).FirstOrDefaultAsync();
        return result;
    }


    public async Task<List<Notification>> GetUserNotifications(string userId)
    {
        //this returns the notifications to a specfic user
        var notifications = await _notificationCollection.Find(x => x.UserId == userId).ToListAsync();

        return notifications;
    }

    public async Task UpdateNotification(string id, PatchRequest request)
    {
        //update a specfic notification
        var filter = Builders<Notification>.Filter.Eq(x => x.Id, id);
        var updateDefinition = Builders<Notification>.Update
            .Set(x => x.Seen, request.Seen);
        
      await _notificationCollection.UpdateOneAsync(filter,updateDefinition);
      
    }
    public async Task DeleteNotification(string id)
    {
        //Delete a notification
        await _notificationCollection.DeleteOneAsync(notification => notification.Id == id);
    }
}