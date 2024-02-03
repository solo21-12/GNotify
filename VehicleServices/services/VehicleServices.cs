
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using VehicleServices.model;
using VehicleServices.Dtos;
using VehicleServices.utils;
namespace VehicleServices.services
{


    public class VehicleService
    {
        private readonly MongoDbContext _dbContext;

        public VehicleService(MongoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddVehicleAsync(Vehicle vehicle)
        {
            var vehicleCollection = _dbContext.GetCollection<Vehicle>("vehicles");
            await vehicleCollection.InsertOneAsync(vehicle);
        }

        public List<Vehicle> GetAllVehicles()
        {
            var vehicleCollection = _dbContext.GetCollection<Vehicle>("vehicles");
            return vehicleCollection.Find(_ => true).ToList();
        }

        public Vehicle GetVehicleById(string id)
        {
            var vehicleId = ObjectId.Parse(id);
            var vehicleCollection = _dbContext.GetCollection<Vehicle>("vehicles");
            return vehicleCollection.Find(v => v.Id == vehicleId).FirstOrDefault();
        }

        public bool UpdateVehicle(string id, Vehicle updatedVehicle)
        {
            var vehicleId = ObjectId.Parse(id);
            var vehicleCollection = _dbContext.GetCollection<Vehicle>("vehicles");
            var filter = Builders<Vehicle>.Filter.Eq(v => v.Id, vehicleId);

            var update = Builders<Vehicle>.Update
                .Set(v => v.PlateNumber, updatedVehicle.PlateNumber)
                // Add other properties to update as needed
                .CurrentDate(v => v.LastModified); // Set the LastModified field to the current date

            var result = vehicleCollection.UpdateOne(filter, update);

            return result.ModifiedCount > 0;
        }

        public bool DeleteVehicle(string id)
        {
            var vehicleId = ObjectId.Parse(id);
            var vehicleCollection = _dbContext.GetCollection<Vehicle>("vehicles");
            var result = vehicleCollection.DeleteOne(v => v.Id == vehicleId);

            return result.DeletedCount > 0;
        }
    }


}