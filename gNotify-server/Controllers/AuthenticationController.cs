using System.Net;
using gNotify_server.Dtos;
using gNotify_server.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using gNotify_server.Services;
namespace gNotify_server.Controllers;

[ApiController]
[Route("api/v1/[action]")]
public class AuthenticationController:ControllerBase
{
    private readonly AuthenticationService _authenticationService;
    public AuthenticationController(AuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }
    
    
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest carOwnerPasswordRegisterRequestDto)
    {
        var result = await _authenticationService.RegisterAsync(carOwnerPasswordRegisterRequestDto);
        return result.Success ? Ok(result) : BadRequest(result.Message);
    }
    
    
    
    
    
    
    
    
    [HttpPost]
    [Route("login")]
    [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(LoginResponse))]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _authenticationService.LoginAsync(request);
        return result.Success ? Ok(result) : BadRequest(result.Message);
    }
}