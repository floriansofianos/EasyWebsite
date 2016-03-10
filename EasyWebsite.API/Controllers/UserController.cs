using EasyWebsite.DB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EasyWebsite.API.Controllers
{
    public class UserController : EWApiController
    {
        public IHttpActionResult Get(string id)
        {
            using (var _repo = new UserRepository(UnitOfWork))
            {
                return Ok(_repo.All.FirstOrDefault(u => !u.IsDeleted && u.UserName == id).Id);
            }
        }
    }
}
