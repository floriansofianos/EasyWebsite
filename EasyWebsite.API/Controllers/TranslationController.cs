using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EasyWebsite.API.Controllers
{
    public class TranslationController : ApiController
    {
        public IHttpActionResult Get(string lang)
        {
            var resourceObject = new JObject();
            // Don't know why but the JS does not give us the correct format
            lang = lang.Replace("_", "-");
            CultureInfo currentCulture = CultureInfo.GetCultures(CultureTypes.AllCultures).FirstOrDefault(c => c.Name == lang);
            var resourceSet = Resources.Index.ResourceManager.GetResourceSet(currentCulture, true, true);
            IDictionaryEnumerator enumerator = resourceSet.GetEnumerator();
            while (enumerator.MoveNext())
            {
                resourceObject.Add(enumerator.Key.ToString(), enumerator.Value.ToString());
            }

            return Ok(resourceObject);
        }
    }
}
