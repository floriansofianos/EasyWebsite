namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class module_content_migration : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ModuleContents", "IsDeleted", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ModuleContents", "IsDeleted");
        }
    }
}
