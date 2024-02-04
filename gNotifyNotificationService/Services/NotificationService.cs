using gNotifyNotificationService.Config;
using gNotifyNotificationService.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace gNotifyNotificationService.Services;

public class NotificationService
{
    private readonly IMongoCollection<Vehicle> _vehicleCollection;

    public NotificationService(IOptions<DatabaseSettings> options)
    {
        var mongoClient = new MongoClient(options.Value.ConnectionStrings);
        var mongoDb = mongoClient.GetDatabase(options.Value.Database);
        _vehicleCollection = mongoDb.GetCollection<Vehicle>(options.Value.Collection);
    }
    
    public async Task<List<Vehicle>> GetVehicle()
    {
        var allVehicles = await _vehicleCollection.Find(_ => true).ToListAsync();
        return allVehicles;
    }
}