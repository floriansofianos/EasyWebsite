using EasyWebsite.DB.DataModel;
using EasyWebsite.DB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EasyWebsite.API.Controllers
{
    public class ModuleContentTranslationController : EWApiController
    {
        public IHttpActionResult Post(ModuleContentTranslation translation)
        {
            using (var _repo = new ModuleContentTranslationRepository(UnitOfWork))
            {
                _repo.InsertOrUpdate(translation);
                UnitOfWork.Save();
            }
            return Ok();
        }
    }
}
