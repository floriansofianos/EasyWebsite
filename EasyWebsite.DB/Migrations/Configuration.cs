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

            if (context.Roles.Count() == 0)
            {
                BuildRolesList().ForEach(r => context.Roles.Add(r));
            }

            if (!(context.Users.Any(u => u.UserName == "superadmin")))
            {
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                var userToInsert = new User { UserName = "superadmin", FirstName = "", Surname = "superadmin" };
                userManager.Create(userToInsert, "Brisbane=4000");
                userManager.AddToRole(userToInsert.Id, "ROLE_ADMINISTRATOR");
            }

            if (context.Clients.Count() == 0)
            {
                context.Clients.AddRange(BuildClientsList());
            }

            if(context.Modules.Count() == 0)
            {
                context.Modules.AddRange(BuildModuleList());
            }

            if (context.SiteSettings.Count() == 0)
            {
                context.SiteSettings.AddRange(BuildSettingsList());
            }

            var modulesToFix = context.ModuleContents.Where(c => c.ContentType == null).ToList();

            foreach (var moduleContent in modulesToFix)
            {
                moduleContent.ContentType = ModuleContent.ModuleContentType.Text;
            }

            
        }

        private static List<Client> BuildClientsList()
        {

            List<Client> clientsList = new List<Client> 
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

            return clientsList;
        }

        private static List<Module> BuildModuleList()
        {
            List<Module> moduleList = new List<Module>
            {
                new Module 
                {
                    IsDeleted = false,
                    MenuPosition = 1,
                    ModuleType = Module.Type.Static,
                    Name = new List<ModuleName> { new ModuleName { Language = "fr_FR", Name = "Test Module" }, new ModuleName { Language = "en_AU", Name = "Module Test" } },
                    Url = "/test-module"
                }
            };

            return moduleList;
        }

        private static List<SiteSetting> BuildSettingsList()
        {
            List<SiteSetting> settingsList = new List<SiteSetting>()
            {
                new SiteSetting
                {
                    Key = "languages",
                    Value = ""
                }
            };
            return settingsList;
        }

        private static List<IdentityRole> BuildRolesList()
        {
            List<IdentityRole> rolesList = new List<IdentityRole>()
            {
                new IdentityRole
                {
                    Name = "ROLE_ADMINISTRATOR"
                },
                new IdentityRole
                {
                    Name = "ROLE_NEWS_WRITER"
                }
            };
            return rolesList;
        }
    }
}
