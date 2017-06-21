using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using FunPOL.Model;
using FunPOL.Repository.Utilities;
using Microsoft.Extensions.Configuration;
using FunPOL.Repository.Contract;

namespace FunPOL.Repository
{
    /// <summary>
    /// Class CompanyRepository.
    /// </summary>
    /// <seealso cref="FunPol.Repository.Utilities.BaseDataAccess" />
    /// <seealso cref="FunPol.Repository.Interface.ICompanyRepository" />
    public class CompanyRepository : BaseDataAccess, ICompanyRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CompanyRepository"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public CompanyRepository(IConfigurationRoot configuration) : base(configuration)
        {
        }

        /// <summary>
        /// Gets the company details.
        /// </summary>
        /// <returns>Returns the company details.</returns>
        public async Task<CompanyDetail[]> GetCompanyDetails()
        {
            List<CompanyDetail> companyDetailList = new List<CompanyDetail>();
            CompanyDetail companyDetails = null;
            var parameterList = new List<DbParameter>();
            using (DbDataReader dataReader = await base.GetDataReader("Select * from CompanyDetails", parameterList, CommandType.Text))
            {
                if (dataReader != null && dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        companyDetails = new CompanyDetail();
                        companyDetails.CompanyName = (string)dataReader["CompanyName"];
                        companyDetails.CompanyEmail = (string)dataReader["CompanyEmail"];
                        companyDetailList.Add(companyDetails);
                    }
                }
            }
            return companyDetailList.ToArray();
        }
    }
}
