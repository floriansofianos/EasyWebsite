using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class User : IdentityUser, IObjectWithState
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public State State { get; set; }  
    }
}
