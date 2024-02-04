using System.ComponentModel.DataAnnotations;

namespace gNotifyVehicleService.Dto;

public class VehicleUpdateRequest
{
    [Required]
    public string? PlateNumber { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime InsuranceRenewalDate { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime BoloRenewalData { get; set; }
    [DataType(DataType.DateTime)]
    public DateTime RoadFundRenewalData { get; set; }
}