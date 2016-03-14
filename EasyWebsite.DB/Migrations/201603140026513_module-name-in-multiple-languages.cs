namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class modulenameinmultiplelanguages : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ModuleNames",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ModuleId = c.Int(nullable: false),
                        Language = c.String(),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Modules", t => t.ModuleId, cascadeDelete: true)
                .Index(t => t.ModuleId);
            
            DropColumn("dbo.Modules", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Modules", "Name", c => c.String());
            DropForeignKey("dbo.ModuleNames", "ModuleId", "dbo.Modules");
            DropIndex("dbo.ModuleNames", new[] { "ModuleId" });
            DropTable("dbo.ModuleNames");
        }
    }
}
