using System.Linq;
using System.Threading.Tasks;
using FunPOL.Servive.Contract;
using FunPOL.UnitOfWork.Interface;
using FunPOL.UnitOfWork.ViewModels;

namespace FunPOL.UnitOfWork
{
    /// <summary>
    /// Class CommonUnitOfWork.
    /// </summary>
    /// <seealso cref="FunPol.UnitOfWork.Interface.IUnitOfWork" />
    public class CommonUnitOfWork : IUnitOfWork
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserService" /> class.
        /// </summary>
        /// <param name="userService">The user service.</param>
        /// <param name="companyService">The company service.</param>
        public CommonUnitOfWork(IUserService userService, ICompanyService companyService)
        {
            this.UserService = userService;
            this.CompanyService = companyService;
        }

        #region PrivateProperties
        /// <summary>
        /// The User repository
        /// </summary>
        private IUserService UserService;

        /// <summary>
        /// The company service
        /// </summary>
        private ICompanyService CompanyService;
        #endregion

        #region PublicMethods
        public async Task<UserViewModel[]> GetUserDetails()
        {
            var userDetails = await this.UserService.GetUsers();
            var userViewModel = userDetails.Select(x => new UserViewModel
            {
                Email = x.Email,
                Location = x.Location,
                Name = x.Name
            }).ToArray();
            return userViewModel;
        }

        /// <summary>
        /// Gets the company details.
        /// </summary>
        /// <returns>Returns the company details.</returns>
        public async Task<CompanyViewModel[]> GetCompanyDetails()
        {
            var companyDetails = await this.CompanyService.GetCompanyDetails();
            var companyDetailViewModel = companyDetails.Select(x => new CompanyViewModel
            {
                CompanyName = x.CompanyName,
                CompanyEmail = x.CompanyEmail
            }).ToArray();
            return companyDetailViewModel;
        }
        #endregion
    }
}
