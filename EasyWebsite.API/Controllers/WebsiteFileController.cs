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
using EasyWebsite.DB;

namespace EasyWebsite.API.Controllers
{
    public class WebsiteFileController : EWApiController
    {
        public HttpResponseMessage Post()
        {
            Stream reqStream = Request.Content.ReadAsStreamAsync().Result;
            MemoryStream tempStream = new MemoryStream();
            reqStream.CopyTo(tempStream);

            tempStream.Seek(0, SeekOrigin.End);
            StreamWriter writer = new StreamWriter(tempStream);
            writer.WriteLine();
            writer.Flush();
            tempStream.Position = 0;

            StreamContent streamContent = new StreamContent(tempStream);
            foreach (var header in Request.Content.Headers)
            {
                streamContent.Headers.Add(header.Key, header.Value);
            }

            var result = new HttpResponseMessage(HttpStatusCode.OK);

            if (Request.Content.IsMimeMultipartContent())
            {
                var task = streamContent.ReadAsMultipartAsync<MultipartMemoryStreamProvider>(new MultipartMemoryStreamProvider());
                task.Wait();
                MultipartMemoryStreamProvider provider = task.Result;
                using (var _repo = new WebsiteFileRepository(UnitOfWork))
                {
                    foreach (HttpContent content in provider.Contents)
                    {
                        WebsiteFile newFile = new WebsiteFile();
                        newFile.Id = Guid.NewGuid();

                        Stream stream = content.ReadAsStreamAsync().Result;
                        string filePath = HostingEnvironment.MapPath("~/Images/");
                        string fileName = content.Headers.ContentDisposition.FileName.Replace("\"", "");
                        string fullPath = Path.Combine(filePath, fileName);

                        using (var fileStream = File.Create(fullPath))
                        {
                            stream.Seek(0, SeekOrigin.Begin);
                            stream.CopyTo(fileStream);
                        }

                        //Add To DB
                        newFile.Filename = fileName;
                        _repo.InsertOrUpdate(newFile);
                    }
                    UnitOfWork.Save();
                }

                return result;
            }
            else
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotAcceptable, "This request is not properly formatted"));
            }
        }

        public IHttpActionResult Get()
        {
            using (var _repo = new WebsiteFileRepository(UnitOfWork))
            {
                return Ok(_repo.All.Where(f => !f.IsDeleted).ToList());
            }
        }
    }
}
