using System.Threading.Tasks;
using FunPOL.Model;

namespace FunPOL.Repository.Contract
{
    /// <summary>
    /// Interface ICompanyRepository.
    /// </summary>
    public interface ICompanyRepository
    {
        /// <summary>
        /// Gets the company details.
        /// </summary>
        /// <returns><Returns the company details.</returns>
        Task<CompanyDetail[]> GetCompanyDetails();
    }
}
