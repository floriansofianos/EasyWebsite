using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EasyWebsite.API.Models
{
    public class ModuleViewModel
    {
        public string Route { get; set; }
        public string Label { get; set; }
        public string Icon { get; set; }
    }

    public static class ModuleVMExtensions
    {
        public static ModuleViewModel ToModuleViewModel(this Module module)
        {
            return new ModuleViewModel()
            {
                Route = module.Url,
                Label = module.Name,
                Icon = "fa-home"
            };
        }
    }
}