using BIT.NET.LbankWCF.Models;
using BIT.NET.LbankWCF.Services;
using LTBank;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using static LTBank.ExchangeRatesSoapClient;

namespace BIT.NET.LbankWCF.Services
{
    public class ChangeRateService : IChangeRateService
    {
        public async Task<List<CurrencyItemDTO>> ChangeCalc(string date)
        {

            //Geting list from SOAP
            var resultNow = await GetFromSoap(date);

            var dateBefore = DateTime.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture).AddDays(-1);

            var resultBefore = await GetFromSoap(dateBefore.ToString());

            //Creating list of DTO
            var result = new List<CurrencyItemDTO>();

            for (int i = 0; i < resultNow.Count; i++)
            {
                var tempDTO = new CurrencyItemDTO
                {
                    Currency = resultNow[i].Currency,
                    Quantity = resultNow[i].Quantity,
                    Rate = resultNow[i].Rate,
                    Change = Math.Round(((resultNow[i].Rate - resultBefore[i].Rate) / resultBefore[i].Rate * 100),4)
                };

                result.Add(tempDTO);
            }
            
            return result.OrderByDescending(o => o.Change).ToList();
        }

        private async Task<List<CurrencyItem>> GetFromSoap(string date)
        {
            var client = new ExchangeRatesSoapClient(EndpointConfiguration.ExchangeRatesSoap);

            var response = await client.getExchangeRatesByDateAsync(date);

            var resultList = new List<CurrencyItem>();

            foreach (XmlNode item in response.ChildNodes)
            {
                var tempCurrencyItem = new CurrencyItem ()
                {
                    Currency = item["currency"].InnerText,
                    Quantity = Convert.ToInt32(item["quantity"].InnerText),
                    Rate = double.Parse(item["rate"].InnerText, System.Globalization.CultureInfo.InvariantCulture)
                };

                resultList.Add(tempCurrencyItem);
            };

            return resultList;
        }
    }
}
