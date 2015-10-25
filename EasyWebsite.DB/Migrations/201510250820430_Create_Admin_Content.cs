namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Create_Admin_Content : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ModuleContents",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        GridsterPosition = c.String(),
                        State = c.Int(nullable: false),
                        Module_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Modules", t => t.Module_Id)
                .Index(t => t.Module_Id);
            
            CreateTable(
                "dbo.ModuleContentTranslations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ModuleContentId = c.Int(nullable: false),
                        Content = c.String(),
                        State = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ModuleContents", t => t.ModuleContentId, cascadeDelete: true)
                .Index(t => t.ModuleContentId);
            
            CreateTable(
                "dbo.SiteSettings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Key = c.String(),
                        Value = c.String(),
                        State = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ModuleContents", "Module_Id", "dbo.Modules");
            DropForeignKey("dbo.ModuleContentTranslations", "ModuleContentId", "dbo.ModuleContents");
            DropIndex("dbo.ModuleContentTranslations", new[] { "ModuleContentId" });
            DropIndex("dbo.ModuleContents", new[] { "Module_Id" });
            DropTable("dbo.SiteSettings");
            DropTable("dbo.ModuleContentTranslations");
            DropTable("dbo.ModuleContents");
        }
    }
}
