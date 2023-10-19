using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Assig2.Data;
using Assig2.Models;
using System.ComponentModel.DataAnnotations;

namespace Assig2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class B_CountriesController : ControllerBase
    {
        private readonly EnvDataContext _context;

        public B_CountriesController(EnvDataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets a list of Countries within a region and includes optional country name search
        /// </summary>
        /// <param name="regionId">The Selected RegionID or 0 if "All Regions"</param>
        /// <param name="searchText">Optional: Search Text the CountryName starts with</param>
        /// <returns>Country Name, Region as well as available years for Temperature and Emission Data</returns>
        // GET: /api/B_Countries/CountryList/{regionId}?searchText=xx
        [HttpGet]
        [Route("CountryList/{regionId}")]
        public async Task<ActionResult<CountrySearchDetail>> GetCountries(int regionId, string? searchText)
        {
            var CountryData = new CountrySearchDetail();

            if (_context.Countries == null)
            {
                return NotFound();
            }

            var region = new RegionDetail();
            var query = _context.Countries.OrderBy(c => c.CountryName).AsQueryable();
            region.CountryCount = query.Count();

            if (regionId > 0)
            {
                query = query.Where(c => c.RegionId == regionId);
                var dbRegion = _context.Regions.Find(regionId);
                if (dbRegion != null)
                {
                    region.CountryCount = query.Count();
                    region.RegionId = dbRegion.RegionId;
                    region.RegionName = dbRegion.RegionName;
                    region.ImageUrl = dbRegion.ImageUrl ?? string.Empty;
                }
                else { return NotFound(); }
            }
            if (!string.IsNullOrWhiteSpace(searchText))
            {
                query = query.Where(c => c.CountryName.StartsWith(searchText));
            }

            CountryData.CountryList = await query.Select(c => new CountryDetail
            {
                CountryId = c.CountryId,
                CountryName = c.CountryName,
                ImageUrl = c.ImageUrl ?? string.Empty,
                Iso3 = c.Iso3 ?? string.Empty,
                CityCount = c.Cities.Count(),
                TemperatureDataYearRange = new[] {
                    c.TemperatureData.Any() ? c.TemperatureData.Min(td => td.Year) : 0,
                   c.TemperatureData.Any() ? c.TemperatureData.Max(td => td.Year) : 0,
                    },
                EmissionDataYearRange = new[]  {
                    c.CountryEmissions.Any() ? c.CountryEmissions.Min(td => td.Year) : 0,
                    c.CountryEmissions.Any() ? c.CountryEmissions.Max(td => td.Year) : 0,
                  }
            }).ToListAsync();

            CountryData.TheRegion = region;

            return CountryData;
        }


        /// <summary>
        /// Gets a list of temperature changes for a selected country and general change detail for other countries in the same region
        /// </summary>
        /// <param name="countryId">The Selected countryId</param>
        /// <returns>regional temperature changes, year range and actual temperature changes for selected country</returns>
        // GET: /api/B_Countries/CountryTemperatureDetail/{countryId}
        [HttpGet]
        [Route("CountryTemperatureDetail/{countryId}")]
        public async Task<ActionResult<CountryTemperatureDetail>> GetCountryTemperatureData(int countryId)
        {
            if (_context.TemperatureData == null)
            {
                return NotFound();
            }

            var query = _context.TemperatureData
                        .Where(td => td.CountryId == countryId)
                        .OrderByDescending(td => td.Year)
                        .AsQueryable();

            var regionalData = _context.TemperatureData
    .Where(td2 => query.Any(q => q.Year == td2.Year && q.Country.Region != null &&
            q.Country.Region.Countries.Select(c => c.CountryId).Contains(td2.CountryId))
            )
    .GroupBy(td2 => td2.Year)
    .Select(group => new
    {
        Year = group.Key,
        RegionalAvg = group.Select(td2 => td2.Value).DefaultIfEmpty().Average(),
        RegionalMin = group.Select(td2 => td2.Value).DefaultIfEmpty().Min(),
        RegionalMax = group.Select(td2 => td2.Value).DefaultIfEmpty().Max()
    })
    .ToDictionary(group => group.Year, group => new
    {
        RegionalAvg = group.RegionalAvg,
        RegionalMin = group.RegionalMin,
        RegionalMax = group.RegionalMax
    });

            var result = query.Select(q => new TemperatureDataDetail
            {
                TheCountryTempData = q,
                RegionalAvg = regionalData.ContainsKey(q.Year) ? regionalData[q.Year].RegionalAvg : null,
                RegionalMin = regionalData.ContainsKey(q.Year) ? regionalData[q.Year].RegionalMin : null,
                RegionalMax = regionalData.ContainsKey(q.Year) ? regionalData[q.Year].RegionalMax : null,
            });

            CountryTemperatureDetail ctd = new CountryTemperatureDetail();
            ctd.MinYear = query.Select(td => td.Year).DefaultIfEmpty().Min();
            ctd.MaxYear = query.Select(td => td.Year).DefaultIfEmpty().Max();
            ctd.RawTemperatureData = await result.ToListAsync();

            if (ctd.RawTemperatureData == null)
            {
                return NotFound();
            }

            return ctd;
        }


        /// <summary>
        /// Gets a list of emission data grouped by year and emission for the selected country 
        /// </summary>
        /// <param name="countryId">The Selected countryId</param>
        /// <returns>emissions for each element grouped by year</returns>
        // GET: /api/B_Countries/SummaryCountryEmissionData/{countryId}
        [HttpGet]
        [Route("SummaryCountryEmissionData/{countryId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetCountryEmissionData(int countryId)
        {
            if (_context.CountryEmissions == null)
            {
                return NotFound();
            }

            var query = await _context.CountryEmissions
                .Where(ce => ce.CountryId == countryId)
                .GroupBy(ce => new
                {
                    ce.Year,
                    Element = ce.ItemElement.Element.ElementName.Contains("N2O") ? "N2O" :
                              ce.ItemElement.Element.ElementName.Contains("CO2") ? "CO2" :
                              ce.ItemElement.Element.ElementName.Contains("CH4") ? "CH4" :
                              ce.ItemElement.Element.ElementName
                })
                .Select(group => new
                {
                    group.Key.Year,
                    group.Key.Element,
                    TotalValue = group.Select(g => g.Value).Sum()
                })
                .OrderBy(ce => ce.Year)
                .ThenBy(ce => ce.Element)
                .ToListAsync();

            if (query == null)
            {
                return NotFound();
            }

            return query;
        }


        /// <summary>
        /// Optional Query: Gets a list of emissions for a specific element ordered by itemName for a selected country
        /// </summary>
        /// <param name="countryId">The Selected countryId</param>
        /// <param name="elementId">The Selected elementId</param>
        /// <returns>A list of Emission values by item for the selected element</returns>
        // GET: /api/B_Countries/api/CountryEmissionData/{countryId}?elementId=x
        [HttpGet]
        [Route("CountryEmissionData/{countryId}")]
        public async Task<ActionResult<IEnumerable<object>>> CountryEmissionData(int countryId, [Required]int elementId)
        {
            if (countryId == 0 || elementId == 0) { return BadRequest(); }

            if (_context.CountryEmissions == null)
            {
                return NotFound();
            }

            var query = await _context.CountryEmissions
                .Where(ce => ce.CountryId == countryId && ce.ElementId == elementId)
                .Select(ce => new
                {
                    ce.Year,
                    ce.ItemElement.Item.ItemName,
                    ce.Value,
                })
                .OrderBy(ce => ce.Year)
                .ThenBy(ce => ce.ItemName)
                .ToListAsync();

            if (query == null)
            {
                return NotFound();
            }

            return query;
        }


        /// <summary>
        /// Optional Query: Gets a list emission elements from the database
        /// </summary>
        /// <param></param>
        /// <returns>A list of Emission Element Names for the above action/query</returns>
        // GET: /api/B_Countries/GetElementList
        [HttpGet]
        [Route("GetElementList")]
        public async Task<ActionResult<IEnumerable<Element>>> GetElementList()
        {
            if (_context.Elements == null)
            {
                return NotFound();
            }

            var elementList = await _context.Elements
                .OrderBy(e => e.ElementName)
                .ToListAsync();

            return elementList;
        }

    }
}
