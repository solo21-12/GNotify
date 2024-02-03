using gNotifyVehicleService.Services;

namespace gNotifyVehicleService.Controllers;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/[controller]")]
public class UserVehicleController:ControllerBase
{
    private readonly VehicleServices _vehicleServices;
    
    public UserVehicleController(VehicleServices vehicleServices)
    {
        _vehicleServices = vehicleServices;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id)
    {
        var allVehicles = await _vehicleServices.GetAllAsync(id);
        if (allVehicles.Any())
        {
            return Ok(allVehicles);
        }
    
        return NotFound();
    }
    
}