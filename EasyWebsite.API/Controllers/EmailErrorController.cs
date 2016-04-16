using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Mvc;

namespace EasyWebsite.API.Controllers
{
    public class EmailErrorController : EWApiController
    {
        [HttpPost]
        public System.Web.Http.IHttpActionResult Post([System.Web.Http.FromBody] string value)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("aspmx.l.google.com");

                mail.From = new MailAddress("florian.sofianos@gmail.com");
                mail.To.Add("florian.sofianos@gmail.com");
                mail.Subject = "Error Mail";
                mail.Body = value;

                SmtpServer.Port = 25;
                //SmtpServer.Credentials = new System.Net.NetworkCredential("username", "password");
                SmtpServer.EnableSsl = false;

                SmtpServer.Send(mail);
            }
            catch (Exception ex)
            {
                // Epic fail
                //TODO save message on the server
            }
            return Ok();
        }
    }
}
