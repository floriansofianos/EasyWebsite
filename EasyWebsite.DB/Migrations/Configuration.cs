namespace EasyWebsite.DB.Migrations
{
    using EasyWebsite.DB.DataModel;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using EasyWebsite.Library;

    internal sealed class Configuration : DbMigrationsConfiguration<EasyWebsite.DB.EasyWebsiteContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EasyWebsite.DB.EasyWebsiteContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            if (!(context.Users.Any(u => u.UserName == "superadmin")))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new User { UserName = "superadmin", FirstName = "", Surname = "superadmin" };
                userManager.Create(userToInsert, "Brisbane=4000");
            }

            if (context.Clients.Count() > 0)
            {
                return;
            }

            context.Clients.AddRange(BuildClientsList());
        }

        private static List<Client> BuildClientsList()
        {

            List<Client> ClientsList = new List<Client> 
            {
                new Client
                { Id = "ngAuthApp", 
                    Secret= "SecretToken".GetHash(), 
                    Name="AngularJS front-end Application", 
                    ApplicationType =  ApplicationTypes.Javascript, 
                    Active = true, 
                    RefreshTokenLifeTime = 7200, 
                    AllowedOrigin = "*"
                }
            };

            return ClientsList;
        }
    }
}
