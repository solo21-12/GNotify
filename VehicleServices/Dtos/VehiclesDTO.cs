using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VehicleServices.Dtos
{
    public class VehiclesDTO
{
    public string? PlateNumber { get; set; }
    public List<DateTime>? RenewalDates { get; set; }
}

}