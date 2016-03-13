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
    public class SiteSettingsController : EWApiController
    {
        [Authorize]
        public IHttpActionResult Get()
        {
            using (var _repo = new SiteSettingsRepository(UnitOfWork))
            {
                return Ok(_repo.All.ToList());
            }
        }

        public IHttpActionResult Get(string key)
        {
            using (var _repo = new SiteSettingsRepository(UnitOfWork))
            {
                return Ok(_repo.All.FirstOrDefault(s => s.Key == key));
            }
        }

        [Authorize]
        public IHttpActionResult Post(List<SiteSetting> settings)
        {
            using (SiteSettingsRepository _repo = new SiteSettingsRepository(UnitOfWork))
            {
                foreach (SiteSetting setting in settings)
                {
                    _repo.InsertOrUpdate(setting);
                }
                UnitOfWork.Save();
            }

            return Ok();
        }
    }
}
