﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class SiteSetting: IObjectWithState
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        [NotMapped]
        public State State { get; set; }
    }
}
