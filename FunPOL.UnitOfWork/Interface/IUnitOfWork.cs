using FunPOL.UnitOfWork.ViewModels;
using System.Threading.Tasks;

namespace FunPOL.UnitOfWork.Interface
{
    /// <summary>
    /// Interface IUnitOfWork.
    /// </summary>
    public interface IUnitOfWork
    {
        /// <summary>
        /// Gets the user details.
        /// </summary>
        /// <returns>Returns the user details/returns>
        Task<UserViewModel[]> GetUserDetails();

        /// <summary>
        /// Gets the company details.
        /// </summary>
        /// <returns></returns>
        Task<CompanyViewModel[]> GetCompanyDetails();
    }
}
