using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EasyWebsite.API.Controllers
{
    public class IsAuthenticatedController : EWApiController
    {
        public IHttpActionResult Get()
        {
            if (User.Identity != null)
            {
                if(!string.IsNullOrEmpty(User.Identity.Name))
                {
                    return Ok(new { Authenticated = true });
                }
            }
            return Ok(new { Authenticated = false });
        }
    }
}
