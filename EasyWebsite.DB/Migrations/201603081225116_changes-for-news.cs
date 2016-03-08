namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changesfornews : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.News", "ModuleId", c => c.Int(nullable: false));
            AddColumn("dbo.News", "Language", c => c.String());
            CreateIndex("dbo.News", "ModuleId");
            AddForeignKey("dbo.News", "ModuleId", "dbo.Modules", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.News", "ModuleId", "dbo.Modules");
            DropIndex("dbo.News", new[] { "ModuleId" });
            DropColumn("dbo.News", "Language");
            DropColumn("dbo.News", "ModuleId");
        }
    }
}
