using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class WebsiteFile
    {
        public Guid Id {get;set;}
        public string Filename { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public State State { get; set; }  
    }
}
