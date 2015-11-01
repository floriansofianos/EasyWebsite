namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alter_table_Module_Content : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ModuleContents", "Module_Id", "dbo.Modules");
            DropIndex("dbo.ModuleContents", new[] { "Module_Id" });
            RenameColumn(table: "dbo.ModuleContents", name: "Module_Id", newName: "ModuleId");
            AddColumn("dbo.ModuleContents", "SizeX", c => c.Int(nullable: false));
            AddColumn("dbo.ModuleContents", "SizeY", c => c.Int(nullable: false));
            AddColumn("dbo.ModuleContents", "Row", c => c.Int(nullable: false));
            AddColumn("dbo.ModuleContents", "Col", c => c.Int(nullable: false));
            AlterColumn("dbo.ModuleContents", "ModuleId", c => c.Int(nullable: false));
            CreateIndex("dbo.ModuleContents", "ModuleId");
            AddForeignKey("dbo.ModuleContents", "ModuleId", "dbo.Modules", "Id", cascadeDelete: true);
            DropColumn("dbo.ModuleContents", "GridsterPosition");
        }
        
        public override void Down()
        {
            AddColumn("dbo.ModuleContents", "GridsterPosition", c => c.String());
            DropForeignKey("dbo.ModuleContents", "ModuleId", "dbo.Modules");
            DropIndex("dbo.ModuleContents", new[] { "ModuleId" });
            AlterColumn("dbo.ModuleContents", "ModuleId", c => c.Int());
            DropColumn("dbo.ModuleContents", "Col");
            DropColumn("dbo.ModuleContents", "Row");
            DropColumn("dbo.ModuleContents", "SizeY");
            DropColumn("dbo.ModuleContents", "SizeX");
            RenameColumn(table: "dbo.ModuleContents", name: "ModuleId", newName: "Module_Id");
            CreateIndex("dbo.ModuleContents", "Module_Id");
            AddForeignKey("dbo.ModuleContents", "Module_Id", "dbo.Modules", "Id");
        }
    }
}
