using EasyWebsite.DB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace EasyWebsite.API.Controllers
{
    public class HasRoleController : EWApiController
    {
        public IHttpActionResult Get(string role)
        {
            if (User.Identity != null)
            {
                using (UserRepository _userRepo = new UserRepository(UnitOfWork))
                {
                    return Ok(new { Access = _userRepo.UserHasRole(User.Identity.Name, role) });
                }
                    
            }
            else return Ok(new { Access = false });
        }
    }
}
