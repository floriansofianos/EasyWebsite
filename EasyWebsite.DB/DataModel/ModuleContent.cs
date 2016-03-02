using System;
using System.Collections.Generic;
using System.ComponentModel;
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
            [Description("MODULE_CONTENT_TYPE_TEXT")]
            Text,
            [Description("MODULE_CONTENT_TYPE_TITLE")]
            Title,
            [Description("MODULE_CONTENT_TYPE_CARD")]
            Card,
            [Description("MODULE_CONTENT_TYPE_WIDGET")]
            Widget,
            [Description("MODULE_CONTENT_TYPE_CAROUSEL")]
            Carousel,
            [Description("MODULE_CONTENT_TYPE_MAP")]
            Map,
            [Description("MODULE_CONTENT_TYPE_MODULE")]
            Module,
            [Description("MODULE_CONTENT_TYPE_IMAGE")]
            Image
        }
    }
}
