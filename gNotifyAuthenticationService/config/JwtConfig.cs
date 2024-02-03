namespace gNotify_server.config;

public class JwtConfig
{
    public string? Secret { get; set; }
    public string? Issuer { get; set; }
    public string? Audience { get; set; }

}