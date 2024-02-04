using gNotifyVehicleService.Services;
using Microsoft.AspNetCore.Authorization;

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

    [Authorize]
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