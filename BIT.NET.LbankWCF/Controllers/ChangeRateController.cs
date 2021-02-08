using BIT.NET.LbankWCF.Models;
using BIT.NET.LbankWCF.Services;
using LTBank;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;
using System.Xml;
using static LTBank.ExchangeRatesSoapClient;

namespace BIT.NET.LbankWCF.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChangeRateController : ControllerBase
    {
       
        private readonly IChangeRate _changerate;

        public ChangeRateController(IChangeRate changerate)
        {
            _changerate = changerate;
        }

        [HttpGet]
        public async Task<List<CurrencyItemDTO>> Get(string date)
        {

            var changeRateDto = await _changerate.ChangeCalc(date);

            var rate = "";


            return changeRateDto;
        }
    }
}
