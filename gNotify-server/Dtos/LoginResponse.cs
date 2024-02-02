namespace gNotify_server.Dtos;

public class LoginResponse
{

    public string? Email { get; set; }
    public string? AccessToken { get; set; }
    public string? UserId { get; set; }
    public bool Success { get; set; }

    public string? Message { get; set; }


}