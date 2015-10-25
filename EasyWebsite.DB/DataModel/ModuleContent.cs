using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class ModuleContent: IObjectWithState
    {
        public int Id { get; set; }
        public string GridsterPosition { get; set; }
        public List<ModuleContentTranslation> ModuleContentTranslations { get; set; }

        public State State { get; set; }
    }
}
