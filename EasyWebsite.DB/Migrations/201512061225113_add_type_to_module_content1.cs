namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class add_type_to_module_content1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ModuleContents", "ContentType", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ModuleContents", "ContentType");
        }
    }
}
