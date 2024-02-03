using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VehicleServices.Dtos;
using VehicleServices.model;
using VehicleServices.services;


namespace VehicleServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
      private readonly VehicleService _vehicleService;

    public VehicleController(VehicleService vehicleService)
    {
        _vehicleService = vehicleService;
    }

    [HttpPost]
    public async Task<IActionResult> AddVehicle([FromBody] VehicleDTO vehicleDTO)
    {
        if (string.IsNullOrEmpty(vehicleDTO.PlateNumber))
        {
            return BadRequest("PlateNumber cannot be null or empty.");
        }

        var newVehicle = new Vehicle
        {
            PlateNumber = vehicleDTO.PlateNumber,
            // Map other properties as needed
        };

        await _vehicleService.AddVehicleAsync(newVehicle);

        return Ok("Vehicle added successfully");
    }

    [HttpGet]
    public IActionResult GetAllVehicles()
    {
        var vehicles = _vehicleService.GetAllVehicles();
        return Ok(vehicles);
    }

    [HttpGet("{id}")]
    public IActionResult GetVehicleById(string id)
    {
        var vehicle = _vehicleService.GetVehicleById(id);

        if (vehicle == null)
            return NotFound();

        return Ok(vehicle);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateVehicle(string id, [FromBody] VehicleDTO updatedVehicleDTO)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest("Id cannot be null or empty.");
        }

        var updatedVehicle = new Vehicle
        {
            PlateNumber = updatedVehicleDTO.PlateNumber,
            // Map other properties as needed
        };

        var success = _vehicleService.UpdateVehicle(id, updatedVehicle);

        if (!success)
            return NotFound();

        return Ok("Vehicle updated successfully");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteVehicle(string id)
    {
        if (string.IsNullOrEmpty(id))
        {
            return BadRequest("Id cannot be null or empty.");
        }

        var success = _vehicleService.DeleteVehicle(id);

        if (!success)
            return NotFound();

        return Ok("Vehicle deleted successfully");
    }  
    }
}