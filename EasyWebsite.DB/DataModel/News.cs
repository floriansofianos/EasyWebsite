﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.DataModel
{
    public class News: IObjectWithState
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Body { get; set; }
        public User Author { get; set; }
        public bool IsDeleted { get; set; }
        public int ModuleId { get; set; }
        public string Language { get; set; }

        [NotMapped]
        public State State { get; set; }  
    }
}
