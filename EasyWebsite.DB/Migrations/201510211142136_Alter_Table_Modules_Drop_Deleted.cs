namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Alter_Table_Modules_Drop_Deleted : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Modules", "Deleted");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Modules", "Deleted", c => c.Boolean(nullable: false));
        }
    }
}
