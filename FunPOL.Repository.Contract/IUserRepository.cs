using FunPOL.Model;
using System.Threading.Tasks;

namespace FunPOL.Repository.Contract
{
    public interface IUserRepository
    {
        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns><Returns the users.</returns>
        Task<UserDetails[]> GetUsers();
    }
}
