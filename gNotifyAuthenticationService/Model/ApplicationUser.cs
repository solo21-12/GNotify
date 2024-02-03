using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace gNotify_server.Model;

[CollectionName("users")]
public class ApplicationUser:MongoIdentityUser<Guid>
{
    public string? FirstName { get; set; }
    public string? MiddleName { get; set; }
    public string? LastName { get; set; }
    public override string? PhoneNumber { get; set; }
    public string? Gender { get; set; }
}