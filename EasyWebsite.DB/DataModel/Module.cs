using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class Module: IObjectWithState
    {
        public int Id { get; set; }
        public List<ModuleName> Name { get; set; }
        public string Url { get; set; }
        public Type ModuleType { get; set; }
        public int? MenuPosition { get; set; }
        public bool IsDeleted { get; set; }
        public List<ModuleContent> ModuleContents { get; set; }
        public List<News> News { get; set; }
        public bool IsHomePage { get; set; }
        public string Icon { get; set; }

        [NotMapped]
        public State State { get; set; }  

        public enum Type
        {
            [Description("MODULE_TYPE_STATIC")]
            Static = 0,
            [Description("MODULE_TYPE_NEWS")]
            News = 1,

        }
    }
}
