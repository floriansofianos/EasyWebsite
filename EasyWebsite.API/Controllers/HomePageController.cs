using EasyWebsite.DB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EasyWebsite.API.Controllers
{
    public class HomePageController : EWApiController
    {
        public IHttpActionResult Get()
        {
            using (ModuleRepository _repo = new ModuleRepository(UnitOfWork))
            {
                return Ok(_repo.All.FirstOrDefault(m => m.IsHomePage && !m.IsDeleted));
            }
        }

    }
}
