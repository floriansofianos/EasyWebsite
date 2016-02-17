namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addwebsitefile : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.WebsiteFiles",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Filename = c.String(),
                        IsDeleted = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.WebsiteFiles");
        }
    }
}
