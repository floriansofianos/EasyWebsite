using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class Module: IObjectWithState
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public Type ModuleType { get; set; }
        public bool Deleted { get; set; }
        public int? MenuPosition { get; set; }
        public bool IsDeleted { get; set; }

        [NotMapped]
        public State State { get; set; }  

        public enum Type
        {
            Static = 0,
            News = 1,

        }
    }
}
