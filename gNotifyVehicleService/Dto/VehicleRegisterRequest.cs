using System.ComponentModel.DataAnnotations;

namespace gNotifyVehicleService.Dto;

public class VehicleRegisterRequest
{
    [Required]
    public string? UserId { get; set; }
    [Required]
    public string? PlateNumber { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime InsuranceRenewalDate { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime BoloRenewalData { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime RoadFundRenewalData { get; set; }
}