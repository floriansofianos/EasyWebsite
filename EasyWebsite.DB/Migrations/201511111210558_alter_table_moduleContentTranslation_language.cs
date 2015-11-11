namespace EasyWebsite.DB.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alter_table_moduleContentTranslation_language : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ModuleContentTranslations", "Language", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.ModuleContentTranslations", "Language");
        }
    }
}
