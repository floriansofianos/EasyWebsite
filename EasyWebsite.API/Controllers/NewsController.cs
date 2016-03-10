﻿using EasyWebsite.DB.DataModel;
using EasyWebsite.DB.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EasyWebsite.API.Controllers
{
    public class NewsController : EWApiController
    {
        public IHttpActionResult Get(int id)
        {
            using (var _repo = new NewsRepository(UnitOfWork))
            {
                return Ok(_repo.All.Where(n => !n.IsDeleted && n.ModuleId == id).ToList());
            }
        }

        [Authorize]
        public IHttpActionResult Post(News news)
        {
            using (UserRepository _userRepo = new UserRepository(UnitOfWork))
            {
                news.Author = _userRepo.All.First(u => u.UserName == User.Identity.Name);
                using (NewsRepository _repo = new NewsRepository(UnitOfWork))
                {
                    _repo.InsertOrUpdate(news);
                    UnitOfWork.Save();
                }
            }
            
            return Ok();
        }
    }
}
