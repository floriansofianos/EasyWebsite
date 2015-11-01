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
        public IHttpActionResult Get(int moduleId)
        {
            List<ModuleContent> moduleContents = new List<ModuleContent>();

            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                var module = _repo.AllIncluding(m => m.ModuleContents)
                        .FirstOrDefault(m => m.Id == moduleId);

                if(module != null)
                {
                    moduleContents = module.ModuleContents;
                }

                return Ok(moduleContents);
            }
        }

        public IHttpActionResult Post(int moduleId, List<ModuleContent> contents)
        {
            using (var _repo = new ModuleRepository(UnitOfWork))
            {
                var module = _repo.AllIncluding(m => m.ModuleContents)
                        .FirstOrDefault(m => m.Id == moduleId);

                if (module != null)
                {
                    module.ModuleContents = contents;
                    module.State = State.Modified;
                }
                else throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.BadRequest));
            }

            UnitOfWork.Save();

            return Ok();
        }
    }
}
