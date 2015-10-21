using EasyWebsite.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace EasyWebsite.API.Controllers
{
    public abstract class EWApiController: ApiController
    {
        protected UnitOfWork UnitOfWork = new UnitOfWork();

        protected override void Dispose(bool disposing)
        {
            UnitOfWork.Dispose();
            base.Dispose(disposing);
        }
    }
}