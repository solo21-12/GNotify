using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace VehicleServices.model
{
    public class User
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
}
}