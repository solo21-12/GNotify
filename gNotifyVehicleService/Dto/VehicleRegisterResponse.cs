namespace gNotifyVehicleService.Dto;

public class VehicleRegisterResponse
{
    public string? VehicleId { get; set; }
    public string? PlateNumber { get; set; }
    public DateTime InsuranceRenewalDate { get; set; }
    public DateTime BoloRenewalData { get; set; }
    public DateTime RoadFundRenewalData { get; set; }
}