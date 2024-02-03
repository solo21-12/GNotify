using System.Net;
using gNotify_server.Dtos;
using gNotify_server.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using gNotify_server.Services;
using gNotify_server.Utils;

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
    [ProducesResponseType((int)HttpStatusCode.OK, Type = typeof(RegisterResponse))]

    public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequestDto)
    {
        if (Enum.TryParse(registerRequestDto.Gender, out Gender gender))
        {
            var result = await _authenticationService.RegisterAsync(registerRequestDto);
            return result.Success ? Ok(result) : BadRequest(result.Message);
        }
        return BadRequest();
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