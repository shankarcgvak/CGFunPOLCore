﻿using System.Threading.Tasks;
using FunPOL.Model;

namespace FunPOL.Servive.Contract
{
    /// <summary>
    /// Interface ICompanyService.
    /// </summary>
    public interface ICompanyService
    {
        /// <summary>
        /// Gets the company details.
        /// </summary>
        /// <returns><Returns the company details.</returns>
        Task<CompanyDetail[]> GetCompanyDetails();
    }
}
