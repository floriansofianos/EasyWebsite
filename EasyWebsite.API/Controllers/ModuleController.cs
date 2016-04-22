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
                modules = _repo.AllIncluding(m => m.Name)
                        .Where(m => !m.IsDeleted)
                        .OrderBy(m => m.MenuPosition)
                        .ToList();
            }

            List<ModuleViewModel> moduleViewModels = modules.Select(m => m.ToModuleViewModel()).ToList();

            return Ok<List<ModuleViewModel>>(moduleViewModels);
        }

        public IHttpActionResult Get(string url, int id)
        {
            int moduleCount;
            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                moduleCount = _repo.All
                        .Where(m => !m.IsDeleted && m.Url == url && m.Id != id)
                        .Count();
            }
            return Ok<bool>(moduleCount > 0);
        }

        public IHttpActionResult Get(int id)
        {
            Module module;
            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                module = _repo.AllIncluding(m => m.Name).FirstOrDefault(m => m.Id == id);
                        
            }
            return Ok<Module>(module);
        }

        public IHttpActionResult Get(string url)
        {
            Module module;
            string partialUrl = url.Split('/')[1];
            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                module = _repo.AllIncluding(m => m.Name)
                        .Where(m => !m.IsDeleted && (m.Url == url || m.Url == "/" + partialUrl))
                        .FirstOrDefault();

            }
            return Ok<Module>(module);
        }

        public IHttpActionResult Get(bool staticType)
        {
            List<ModuleViewModel> modules;
            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                modules = _repo.AllIncluding(m => m.Name)
                    .Where(m => !m.IsDeleted && m.ModuleType == Module.Type.Static).ToList()
                    .Select(m => m.ToModuleViewModel())
                        .ToList();

            }
            return Ok<List<ModuleViewModel>>(modules);
        }

        public IHttpActionResult Post(Module module)
        {
            using(ModuleRepository _repo = new ModuleRepository(UnitOfWork))
            {
                using (ModuleNameRepository _moduleNameRepo = new ModuleNameRepository(UnitOfWork))
                {
                    if (module.Id != default(int))
                    {
                        // Need to specify the state of everything in order not to have double-ups
                        module.State = State.Modified;
                        module.Name.ForEach(n => _moduleNameRepo.InsertOrUpdate(n));
                    }
                    _repo.InsertOrUpdate(module);
                    UnitOfWork.Save();
                }
            }
            return Ok();
        }
    }
}
