using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class ModuleName
    {
        public int Id { get; set; }
        public int ModuleId { get; set; }
        public string Language { get; set; }
        public string Name { get; set; }


        [NotMapped]
        public State State { get; set; }
    }
}
