using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BIT.NET.LbankWCF.Models
{
    public class CurrencyItemDTO
    {
        public string Currency { get; set; }
        public int Quantity { get; set; }
        public double Rate { get; set; }
        public double Change { get; set; }

    }
}
