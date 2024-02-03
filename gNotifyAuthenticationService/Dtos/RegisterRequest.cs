using System.ComponentModel.DataAnnotations;

namespace gNotify_server.Dtos;

public class RegisterRequest
{
    [Required,EmailAddress]
    public string? Email { get; set; }
    [Required]
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    [Required]
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Gender { get; set; }
    
    [Required,DataType(DataType.Password)]
    public string? Password { get; set; }
    
    [Required,DataType(DataType.Password),Compare(nameof(Password),ErrorMessage = "Password doesn't match")]
    public string? ConfirmPassword { get; set; }
    
}