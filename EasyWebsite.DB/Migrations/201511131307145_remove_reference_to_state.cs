namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class remove_reference_to_state : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.ModuleContents", "State");
            DropColumn("dbo.ModuleContentTranslations", "State");
            DropColumn("dbo.SiteSettings", "State");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SiteSettings", "State", c => c.Int(nullable: false));
            AddColumn("dbo.ModuleContentTranslations", "State", c => c.Int(nullable: false));
            AddColumn("dbo.ModuleContents", "State", c => c.Int(nullable: false));
        }
    }
}
