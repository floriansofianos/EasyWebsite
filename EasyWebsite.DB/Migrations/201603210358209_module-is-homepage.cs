namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class moduleishomepage : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Modules", "IsHomePage", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Modules", "IsHomePage");
        }
    }
}
