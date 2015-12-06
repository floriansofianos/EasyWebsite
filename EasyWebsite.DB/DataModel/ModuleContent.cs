using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class ModuleContent : IObjectWithState
    {
        public int Id { get; set; }
        public int ModuleId { get; set; }
        public int SizeX { get; set; }
        public int SizeY { get; set; }
        public int Row { get; set; }
        public int Col { get; set; }
        public List<ModuleContentTranslation> ModuleContentTranslations { get; set; }
        public bool IsDeleted { get; set; }
        public ModuleContentType ContentType { get; set; }
        public int Ui_id
        {
            get
            {
                return Id;
            }

        }

        [NotMapped]
        public State State { get; set; }

        public enum ModuleContentType
        {
            Text,
            Title,
            Card,
            Widget,
            Carousel,
            Map,
            Module
        }
    }
}
