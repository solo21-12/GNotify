namespace gNotify_server.Dtos;

public class User
{
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Gender { get; set; }
    public string? Email { get; set; }

    public bool Success { get; set; }
    public string? Message { get; set; }
}