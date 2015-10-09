using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class User : IdentityUser, IObjectWithState
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public bool Enabled { get; set; }
    }
}
