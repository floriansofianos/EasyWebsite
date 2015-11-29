using EasyWebsite.API.Models;
using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EasyWebsite.Library;

namespace EasyWebsite.API.Controllers
{
    public class ModuleTypeController : EWApiController
    {
        public IHttpActionResult Get()
        {
            List<ModuleTypeViewModel> moduleTypes = Enum.GetValues(typeof(Module.Type)).Cast<Module.Type>().Select(e => new ModuleTypeViewModel()
            {
                Id = (int)e,
                Label = e.ToDescription()
            }).ToList();

            return Ok<List<ModuleTypeViewModel>>(moduleTypes);
        }
    }
}
