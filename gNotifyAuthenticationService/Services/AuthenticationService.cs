using gNotify_server.config;
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
 public AuthenticationService(UserManager<ApplicationUser> userManager, JwtConfig jwtConfig)
 {
  _userManager = userManager;
  _jwtConfig = jwtConfig;
 }

 private readonly UserManager<ApplicationUser> _userManager;
 private readonly JwtConfig _jwtConfig;
 
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
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
       };
       
       var audiences = new List<string> { "https://localhost:7138", "audience2" };
       
       var issuer =  "https://localhost:7138";
       // var audience = "https://localhost:7138";
       var secret = "6jxUdXPi6wHzBo1X1hIQgwCDU7EMyEUxlFYcJUc";
       var expires = DateTime.Now.AddMinutes(30);
       
       var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
       var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
       
       var token = new JwtSecurityToken(
        claims: claim,
        expires: expires,
        signingCredentials: signingCredentials,
        issuer:issuer,
        audience:String.Join(",",audiences)
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
     public async Task<ProfileUpdateResponse> UpdateProfile(ProfileUpdateRequest profileUpdateRequest)
     {
      var user = await _userManager.FindByIdAsync(profileUpdateRequest.Id);

      if (user != null)
      {
       user.PhoneNumber = profileUpdateRequest.PhoneNumber;
       user.FirstName = profileUpdateRequest.FirstName;
       user.LastName = profileUpdateRequest.LastName;
       user.MiddleName = profileUpdateRequest.MiddleName;
       user.Gender = profileUpdateRequest.Gender;

       var updateResult = await _userManager.UpdateAsync(user);

       return updateResult.Succeeded
        ? new ProfileUpdateResponse { Message = "Profile successfully updated", Success = true }
        : new ProfileUpdateResponse { Message = "Error updating user profile", Success = false };
      }

      return new ProfileUpdateResponse { Message = "Invalid user id", Success = false };
     }

}