using EasyWebsite.DB.DataModel;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB
{
    public class EasyWebsiteContext : IdentityDbContext<User>
    {
        public DbSet<News> News { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Client> Clients { get; set; }

        public EasyWebsiteContext()
            : base("MyEasyWebsiteDB")
        {
        }

    }
}
