using System.ComponentModel.DataAnnotations;

namespace gNotify_server.Dtos;

public class ProfileUpdateRequest
{
    [Required]
    public string? Id { get; set; }
    [DataType(DataType.Text)]
    public string? FirstName { get; set; }
    [DataType(DataType.Text)]
    public string? MiddleName { get; set; }
    [DataType(DataType.Text)]
    public string? LastName { get; set; }
    [DataType(DataType.Text)]
    public string? PhoneNumber { get; set; }
    [DataType(DataType.Text)]
    public string? Gender { get; set; }
}