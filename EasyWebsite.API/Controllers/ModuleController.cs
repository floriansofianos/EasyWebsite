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

        public IHttpActionResult Get(int id)
        {
            Module module;
            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                module = _repo.Find(id);
                        
            }
            return Ok<Module>(module);
        }

        public IHttpActionResult Post(Module module)
        {
            using(ModuleRepository _repo = new ModuleRepository(UnitOfWork))
            {
                _repo.InsertOrUpdate(module);
                UnitOfWork.Save();
            }
            return Ok();
        }
    }
}
