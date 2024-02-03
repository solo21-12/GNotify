using gNotifyVehicleService.Config;
using gNotifyVehicleService.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace gNotifyVehicleService.Services;

public class VehicleServices
{

    private readonly IMongoCollection<Vehicle> _vehicleCollection;

    public VehicleServices(IOptions<DatabaseSettings> options)
    {
        var mongoClient = new MongoClient(options.Value.ConnectionStrings);
        var mongoDb = mongoClient.GetDatabase(options.Value.Database);
        _vehicleCollection = mongoDb.GetCollection<Vehicle>(options.Value.Collection);
    }

    public async Task<List<Vehicle>> GetAllAsync(string userId)
    {
        var allVehicles = await _vehicleCollection.Find(vehicle => vehicle.UserId == userId).ToListAsync();
        return allVehicles;
    }
    
    public async Task<Vehicle> GetVehicle(string vehicleId)
    {
        var allVehicles = await _vehicleCollection.Find(vehicle => vehicle.VehicleId == vehicleId).FirstOrDefaultAsync();
        return allVehicles;
    }
    
    public async Task CreateVehicle(Vehicle vehicle){
         await _vehicleCollection.InsertOneAsync(vehicle);
    }

    public async Task UpdateVehicle(Vehicle vehicle)
    {
        await _vehicleCollection.ReplaceOneAsync(x => x.VehicleId == vehicle.VehicleId, vehicle);
    }

    public async Task DeleteVehicle(string id)
    {
        await _vehicleCollection.DeleteOneAsync(vehicle => vehicle.VehicleId == id);
    }
}