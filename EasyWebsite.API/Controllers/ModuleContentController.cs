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
    public class ModuleContentController : EWApiController
    {
        public IHttpActionResult Get(int id)
        {
            List<ModuleContent> moduleContents = new List<ModuleContent>();

            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                var module = _repo.AllIncluding(m => m.ModuleContents)
                        .FirstOrDefault(m => m.Id == id);

                if(module != null)
                {
                    moduleContents = module.ModuleContents.Where(c => !c.IsDeleted).ToList();
                }

                return Ok(moduleContents);
            }
        }

        public IHttpActionResult Post(int id, List<ModuleContent> contents)
        {
            using(var _moduleContentRepo = new ModuleContentRepository(UnitOfWork))
            {
                using (var _repo = new ModuleRepository(UnitOfWork))
                {
                    // First update all the elements that need updating.
                    foreach (ModuleContent item in contents)
                    {
                        _moduleContentRepo.InsertOrUpdate(item);
                    }

                    // Then delete all the entities that are not there anymore.
                    var module = _repo.AllIncluding(m => m.ModuleContents)
                            .FirstOrDefault(m => m.Id == id);

                    if (module != null)
                    {
                        // Delete the contents that needs to be deleted
                        List<ModuleContent> contentsToDelete = module.ModuleContents.Where(c => !contents.Select(i => i.Id).Contains(c.Id)).ToList();
                        contentsToDelete.ForEach(c => _moduleContentRepo.Delete(c.Id));
                    }
                    else throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));

                    UnitOfWork.Save();
                }
            }
            

            return Ok();
        }
    }
}
