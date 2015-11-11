using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class ModuleContentTranslation: IObjectWithState
    {
        public int Id { get; set; }
        public int ModuleContentId { get; set; }
        public string Content { get; set; }
        public string Language { get; set; }
        public State State { get; set; }
    }
}
