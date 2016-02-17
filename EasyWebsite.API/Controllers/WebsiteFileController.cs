using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;
using EasyWebsite.DB.Repositories;
using EasyWebsite.DB.DataModel;

namespace EasyWebsite.API.Controllers
{
    public class WebsiteFileController : EWApiController
    {
        public HttpResponseMessage Post()
        {
            var result = new HttpResponseMessage(HttpStatusCode.OK);
            if (Request.Content.IsMimeMultipartContent())
            {
                Request.Content.ReadAsMultipartAsync<MultipartMemoryStreamProvider>(new MultipartMemoryStreamProvider()).ContinueWith((task) =>
                {
                    MultipartMemoryStreamProvider provider = task.Result;
                    using (var _repo = new WebsiteFileRepository(UnitOfWork))
                    {
                        foreach (HttpContent content in provider.Contents)
                        {
                            Stream stream = content.ReadAsStreamAsync().Result;
                            Image image = Image.FromStream(stream);
                            string filePath = HostingEnvironment.MapPath("~/Images/");
                            string[] headerValues = (String[])Request.Headers.GetValues("UniqueId");
                            string fileName = headerValues[0] + ".jpg";
                            string fullPath = Path.Combine(filePath, fileName);
                            image.Save(fullPath);

                            //Add To DB
                            WebsiteFile newFile = new WebsiteFile();
                            newFile.Id = Guid.NewGuid();
                            newFile.Filename = fileName;
                            _repo.InsertOrUpdate(newFile);
                        }
                        UnitOfWork.Save();
                    }
                    
                });
                return result;
            }
            else
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted"));
            }


        }
    }
}
