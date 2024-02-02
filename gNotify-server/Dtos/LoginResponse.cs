namespace gNotify_server.Dtos;

public class LoginResponse
{

    public string? Email { get; set; }
    public string? AccessToken { get; set; }
    public Guid? UserId { get; set; }
    public bool Success { get; set; }

    public string? Message { get; set; }


}