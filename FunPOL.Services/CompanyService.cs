using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FunPOL.Repository.Contract;
using FunPOL.Model;
using FunPOL.Servive.Contract;

namespace FunPOL.Service
{
    /// <summary>
    /// Class CompanyService.
    /// </summary>
    /// <seealso cref="FunPol.BusinessLayer.Interface.ICompanyService" />
    public class CompanyService : ICompanyService
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CompanyService"/> class.
        /// </summary>
        /// <param name="companyRepository">The company repository.</param>
        public CompanyService(ICompanyRepository companyRepository)
        {
            this.CompanyRepository = companyRepository;
        }

        #region PrivateProperties
        /// <summary>
        /// The Company repository
        /// </summary>
        private ICompanyRepository CompanyRepository;
        #endregion

        #region PublicMethods 
        /// <summary>
        /// Gets the company details.
        /// </summary>
        /// <returns></returns>
        public async Task<CompanyDetail[]> GetCompanyDetails()
        {
            return await this.CompanyRepository.GetCompanyDetails();
        }
        #endregion
    }
}
