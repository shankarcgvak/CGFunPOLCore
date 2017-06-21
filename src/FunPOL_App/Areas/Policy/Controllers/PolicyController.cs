using Microsoft.AspNetCore.Mvc;
using FunPOL.UnitOfWork.Interface;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace FunPol.Mvc.Areas.Policy.Controllers
{
    [Area("Policy")]
    public class PolicyController : Controller
    {
        public PolicyController(IUnitOfWork unitOfWork)
        {
            this.UnitOfWork = unitOfWork;
        }

        #region PrivateProperties
        /// <summary>
        /// The unit of work
        /// </summary>
        private readonly IUnitOfWork UnitOfWork;
        #endregion

        public IActionResult Index()
        {
            return View();
        }
    }
}
