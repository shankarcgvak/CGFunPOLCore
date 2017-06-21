using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using FunPOL.Model;
using FunPOL.Repository.Contract;
using FunPOL.Repository.Utilities;
using Microsoft.Extensions.Configuration;

namespace FunPOL.Repository
{
    /// <summary>
    /// Class UserRepository.
    /// </summary>
    /// <seealso cref="FunPol.Repository.Utilities.BaseDataAccess" />
    /// <seealso cref="FunPol.Repository.Interface.IUserRepository" />
    public class UserRepository : BaseDataAccess, IUserRepository
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UserRepository"/> class.
        /// </summary>
        /// <param name="configuration">The configuration.</param>
        public UserRepository(IConfigurationRoot configuration) : base(configuration)
        {
        }

        /// <summary>
        /// Gets the users.
        /// </summary>
        /// <returns>Returns the users.</returns>
        public async Task<UserDetails[]> GetUsers()
        {
            List<UserDetails> userDetailList = new List<UserDetails>();
            UserDetails userDetails = null;
            var parameterList = new List<DbParameter>();
            using (DbDataReader dataReader = await base.GetDataReader("Select * from UserDetails", parameterList, CommandType.Text))
            {
                if (dataReader != null && dataReader.HasRows)
                {
                    while (dataReader.Read())
                    {
                        userDetails = new UserDetails();
                        userDetails.Name = (string)dataReader["Name"];
                        userDetails.Location = (string)dataReader["Location"];
                        userDetails.Email = (string)dataReader["Email"];
                        userDetailList.Add(userDetails);
                    }
                }
            }
            return userDetailList.ToArray();
        }
    }   
}
