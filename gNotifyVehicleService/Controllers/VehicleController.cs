using System.Net;
using gNotifyVehicleService.Dto;
using gNotifyVehicleService.Models;
using gNotifyVehicleService.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace gNotifyVehicleService.Controllers;


[ApiController]
[Route("api/[controller]")]
public class VehicleController:ControllerBase
{
    private readonly VehicleServices _vehicleServices;
    
    public VehicleController(VehicleServices vehicleServices)
    {
        _vehicleServices = vehicleServices;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var vehicle = await _vehicleServices.GetVehicle(id);
        if (vehicle != null)
        {
            
            return Ok(vehicle);
        }
        return NotFound();
    }

    
    [HttpPost]
    [ProducesResponseType((int) HttpStatusCode.OK,Type = typeof(VehicleRegisterResponse))]
    public async Task<IActionResult> Post([FromBody] VehicleRegisterRequest vehicle)
    {
        ObjectId newId = ObjectId.GenerateNewId();
        Console.WriteLine(newId);
        var newVehicle = new Vehicle
        {
            VehicleId = newId.ToString(),
            PlateNumber = vehicle.PlateNumber,
            UserId = vehicle.UserId,
            BoloRenewalData = vehicle.BoloRenewalData,
            InsuranceRenewalDate = vehicle.InsuranceRenewalDate,
            RoadFundRenewalData = vehicle.RoadFundRenewalData
        };
        await _vehicleServices.CreateVehicle(newVehicle);
        return CreatedAtAction(nameof(Get), new{id = newVehicle.VehicleId}, newVehicle);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromBody] VehicleUpdateRequest vehicle, string id)
    {
        Console.WriteLine(id);
        var existingVehicle = await _vehicleServices.GetVehicle(id);

        if (existingVehicle is null)
        {
            return BadRequest();
        }
        
        var updatedVehicle = new Vehicle
        {
            VehicleId = existingVehicle.VehicleId,
            PlateNumber = vehicle.PlateNumber,
            UserId = existingVehicle.UserId,
            BoloRenewalData = vehicle.BoloRenewalData,
            InsuranceRenewalDate = vehicle.InsuranceRenewalDate,
            RoadFundRenewalData = vehicle.RoadFundRenewalData
        };
        await _vehicleServices.UpdateVehicle(updatedVehicle);
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete( string id)
    {
        var existingVehicle = await _vehicleServices.GetVehicle(id);

        if (existingVehicle is null)
        {
            return BadRequest();
        }
        await _vehicleServices.DeleteVehicle(id);
        return NoContent();
    }
}