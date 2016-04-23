namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addicontomodule : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Modules", "Icon", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Modules", "Icon");
        }
    }
}
