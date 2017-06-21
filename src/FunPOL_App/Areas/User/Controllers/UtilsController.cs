using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FunPOL.UnitOfWork.Interface;

namespace FunPol.Mvc.Area.User.Controllers
{
    /// <summary>
    /// Class UserController.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Controller" />
    [Area("Utils")]
    public class UtilsController : Controller
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserController"/> class.
        /// </summary>
        /// <param name="unitOfWork">The user of work.</param>
        public UtilsController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        #region PrivateProperties
        /// <summary>
        /// The unit of work
        /// </summary>
        private readonly IUnitOfWork UnitOfWork;
        #endregion

        
       
    }
}
