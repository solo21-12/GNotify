using gNotifyVehicleService.Models;
using gNotifyVehicleService.Services;
using Microsoft.AspNetCore.Mvc;

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
    public async Task<IActionResult> Post([FromBody] Vehicle vehicle)
    {
        await _vehicleServices.CreateVehicle(vehicle);
        return CreatedAtAction(nameof(Get), new{id = vehicle.VehicleId}, vehicle);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put([FromBody] Vehicle vehicle, string id)
    {
        var existingVehicle = await _vehicleServices.GetVehicle(id);

        if (existingVehicle is null)
        {
            return BadRequest();
        }

        vehicle.VehicleId = existingVehicle.VehicleId;
        vehicle.UserId = existingVehicle.UserId;
        await _vehicleServices.UpdateVehicle(vehicle);
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