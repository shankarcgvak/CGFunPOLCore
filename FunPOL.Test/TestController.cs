using System.IO;
using System.Threading.Tasks;
using FunPOL.Servive.Contract;
//using FunPOL.Mvc.Area.Company.Controllers;
//using FunPOL. Mvc.Area.User.Controllers;
using FunPOL.Repository;
using FunPOL.Repository.Contract;
using FunPOL.UnitOfWork;
using FunPOL.UnitOfWork.Interface;
using Microsoft.Extensions.Configuration;
using Xunit;
using FunPol.Services;
using FunPOL_App.Company.Controllers;
using FunPol.Mvc.Area.User.Controllers;
using FunPOL.Service;

namespace FunPOL.Test
{
    /// <summary>
    /// Class TestController.
    /// </summary>
    public class TestController
    {   
        /// <summary>
        /// Initializes a new instance of the <see cref="TestController"/> class.
        /// </summary>
        public TestController()
        {
            var builder = new ConfigurationBuilder().SetBasePath(Path.GetFullPath(@"../FunPol.UnitTest")).AddJsonFile("appsettings.json");
            configuration = builder.Build();
            this.data = configuration.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
        }

        #region Public Properties
        /// <summary>
        /// The unit of work
        /// </summary>
        public IUnitOfWork unitOfWork;

        /// <summary>
        /// Gets or sets the user service.
        /// </summary>
        /// <value>
        /// The user service.
        /// </value>
        public IUserService userService { get; set; }

        /// <summary>
        /// Gets or sets the company service.
        /// </summary>
        /// <value>
        /// The company service.
        /// </value>
        public ICompanyService companyService { get; set; }

        /// <summary>
        /// Gets or sets the user repository.
        /// </summary>
        /// <value>
        /// The user repository.
        /// </value>
        public IUserRepository userRepository { get; set; }

        /// <summary>
        /// Gets or sets the company repository.
        /// </summary>
        /// <value>
        /// The company repository.
        /// </value>
        public ICompanyRepository companyRepository { get; set; }

        /// <summary>
        /// Gets or sets the configuration.
        /// </summary>
        /// <value>
        /// The configuration.
        /// </value>
        public IConfigurationRoot configuration { get; set; }

        /// <summary>
        /// Gets or sets the data.
        /// </summary>
        /// <value>
        /// The data.
        /// </value>
        public string data { get; set; }
        #endregion

        #region Test Methods
        /// <summary>
        /// Gets the users test.
        /// </summary>
        /// <returns>
        /// Returns the test status
        /// </returns>
        [Fact]
        public async Task GetUsersTest()
        {
            userRepository = new UserRepository(configuration);
            userService = new UserService(userRepository);
            unitOfWork = new CommonUnitOfWork(userService, companyService);
            UserController userController = new UserController(unitOfWork);
            var result = await userController.UserDetails();
            Assert.NotNull(result);
        }

        /// <summary>
        /// Gets the company details test.
        /// </summary>
        /// <returns>
        /// Returns the test status
        /// </returns>
        [Fact]
        public async Task GetCompanyDetailsTest()
        {
            companyRepository = new CompanyRepository(configuration);
            companyService = new CompanyService(companyRepository);
            unitOfWork = new CommonUnitOfWork(userService, companyService);
            CompanyController companyController = new CompanyController(unitOfWork);
            var result = await companyController.CompanyDetails();
            Assert.NotNull(result);
        }
        #endregion
    }
}
