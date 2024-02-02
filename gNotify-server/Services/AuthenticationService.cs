using gNotify_server.Dtos;
using gNotify_server.Model;

namespace gNotify_server.Services;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;


public class AuthenticationService
{
 private readonly UserManager<ApplicationUser> _userManager;

 public AuthenticationService(UserManager<ApplicationUser> userManager) => _userManager = userManager;

     public async Task<LoginResponse> LoginAsync(LoginRequest request)
     {
      try
      {
       var user = await _userManager.FindByEmailAsync(request.Email);
       
       if (user is null)
       {
        return new LoginResponse{Message = "Invalid email/password",Success = false};
       }
       
       var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);

       if (!isPasswordValid)
       {
        return new LoginResponse { Message = "Invalid email/password", Success = false };
       }
       
       var claim = new List<Claim> {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
       };
      
       var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("6jxUdXPi6wHzBo1X1hIQgwCDU7EMyEUxlFYcJUc"));
       var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
       var expires = DateTime.Now.AddMinutes(30);
       var token = new JwtSecurityToken(
        claims: claim,
        expires: expires,
        signingCredentials: signingCredentials
       );
       return new LoginResponse
       {
        AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
        Message = "Login successful",
        Email = user.Email,
        Success = true,
        UserId = user.Id
       };
      }
      catch (Exception e)
      {
       Console.WriteLine(e);
       return new LoginResponse
       {
        Success = false,
        Message = "login failed",
       };
      }
     }
     
     public async Task<RegisterResponse> RegisterAsync(RegisterRequest requestDto)
     {
      try
      {
       var userExist = await _userManager.FindByEmailAsync(requestDto.Email);
     
       if (userExist != null)
       {
        return new RegisterResponse()
        {
         Message = "user already exist",
         Success = false
        };
       }
     
       userExist = new ApplicationUser
       {
        UserName = requestDto.Email,
        Email = requestDto.Email,
        FirstName = requestDto.FirstName,
        LastName = requestDto.LastName,
        MiddleName = requestDto.MiddleName,
        Gender = requestDto.Gender,
        PhoneNumber = requestDto.PhoneNumber,
       };
       
       var result = await _userManager.CreateAsync(userExist, requestDto.Password);
     
       if (!result.Succeeded)
       {
        return new RegisterResponse
        {
         Message = $"Create user failed: {result.Errors.First().Description}",
         Success = false
        };
       }
     
       return new RegisterResponse
       {
        Message = "user created successfully",
        Success = true
       };
     
     
      }
      catch (Exception e)
      {
       Console.WriteLine(e);
       return new RegisterResponse
       {
        Message = "Register failed",
        Success = false
       };
      }
     }
}