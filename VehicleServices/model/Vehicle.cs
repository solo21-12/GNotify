using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MongoDB.Bson;

namespace VehicleServices.model
{
    public class Vehicle
    {
        public ObjectId Id { get; set; }
        public string PlateNumber { get; set; }
        // Add other properties as needed
        public DateTime LastModified { get; set; }
    }
}
