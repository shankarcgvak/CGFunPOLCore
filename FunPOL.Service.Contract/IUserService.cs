using FunPOL.Model;
using System.Threading.Tasks;

namespace FunPOL.Servive.Contract
{
    /// <summary>
    /// Interface IUserService.
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns><Returns the users.</returns>
        Task<UserDetails[]> GetUsers();
    }
}
