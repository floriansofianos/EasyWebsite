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
    public class ModuleContentTypeController : EWApiController
    {
        public IHttpActionResult Get()
        {
            List<ModuleContentTypeViewModel> moduleContentTypes = Enum.GetValues(typeof(ModuleContent.ModuleContentType)).Cast<ModuleContent.ModuleContentType>().Select(e => new ModuleContentTypeViewModel()
            {
                Id = (int)e,
                Label = e.ToDescription()
            }).ToList();

            return Ok<List<ModuleContentTypeViewModel>>(moduleContentTypes);
        }
    }
}
