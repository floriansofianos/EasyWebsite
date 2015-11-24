using EasyWebsite.API.Models;
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
    public class ModuleController : EWApiController
    {
        public IHttpActionResult Get()
        {
            List<Module> modules = new List<Module>();

            using(var _repo = new ModuleRepository(UnitOfWork))
            {
                modules = _repo.All
                        .Where(m => !m.IsDeleted)
                        .OrderBy(m => m.MenuPosition)
                        .ToList();
            }

            List<ModuleViewModel> moduleViewModels = modules.Select(m => m.ToModuleViewModel()).ToList();

            return Ok<List<ModuleViewModel>>(moduleViewModels);
        }

        public IHttpActionResult Get(string url)
        {
            int moduleCount;
            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                moduleCount = _repo.All
                        .Where(m => !m.IsDeleted && m.Url == url)
                        .Count();
            }
            return Ok<bool>(moduleCount > 0);
        }
    }
}
