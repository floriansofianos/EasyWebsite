using System.Web;
using System.Web.Optimization;

namespace EasyWebsite.API
{
    public class BundleConfig
    {
        // Pour plus d’informations sur le regroupement, rendez-vous sur http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Utilisez la version de développement de Modernizr pour développer et apprendre. Puis, lorsque vous êtes
            // prêt pour la production, utilisez l’outil de génération sur http://modernizr.com pour sélectionner uniquement les tests dont vous avez besoin.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/gridster-bootstrap.min.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/tinymce").Include(
                      "~/Scripts/tinymce.min.js"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/underscore").Include(
                      "~/Scripts/underscore-min.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/angular.min.js",
                      "~/Scripts/angular-locale_fr-fr.js",
                      "~/Scripts/angular-locale_en-us.js",
                      "~/Scripts/angular-locale_en-gb.js",
                      "~/Scripts/angular-locale_en-au.js",
                      "~/Scripts/angular-translate.min.js",
                      "~/Scripts/angular-sanitize.min.js",
                      "~/Scripts/angular-translate-loader-url.min.js",
                      "~/Scripts/angular-local-storage.min.js",
                      "~/Scripts/angular-resource.min.js",
                      "~/Scripts/angular-gridster.min.js",
                      "~/Scripts/angular-tinymce.js",
                      "~/Scripts/angular-gridster.min.js",
                      "~/Scripts/ui-bootstrap-tpls-0.14.3.min.js",
                      "~/Scripts/angular-route.min.js",
                      "~/Scripts/bootstrap-colorpicker-module.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                      "~/Scripts/app/modules/App.js",
                      "~/Scripts/app/modules/app.menu.js",
                      "~/Scripts/app/modules/app.dashboard.js",
                      "~/Scripts/app/directives/TopMenu.js",
                      "~/Scripts/app/directives/TopMenuItem.js",
                      "~/Scripts/app/directives/ewDashboard.js",
                      "~/Scripts/app/directives/ewStaticDashboard.js",
                      "~/Scripts/app/directives/ModuleUrl.js",
                      "~/Scripts/app/controllers/HomePage.js",
                      "~/Scripts/app/controllers/LoginPage.js",
                      "~/Scripts/app/controllers/AdminPage.js",
                      "~/Scripts/app/controllers/TopMenu.js",
                      "~/Scripts/app/controllers/ContentController.js",
                      "~/Scripts/app/controllers/AdminContentController.js",
                      "~/Scripts/app/controllers/ModalInstanceController.js",
                      "~/Scripts/app/controllers/AdminModuleController.js",
                      "~/Scripts/app/controllers/ModalContentTextController.js",
                      "~/Scripts/app/controllers/ModalContentTitleController.js",
                      "~/Scripts/app/services/AuthService.js",
                      "~/Scripts/app/services/RoutingHelper.js",
                      "~/Scripts/app/services/TopMenuHelper.js",
                      "~/Scripts/app/services/ModuleHelper.js",
                      "~/Scripts/app/services/ModuleContentHelper.js",
                      "~/Scripts/app/services/ModuleTypeHelper.js",
                      "~/Scripts/app/services/ModuleContentTypeHelper.js",
                      "~/Scripts/app/services/ModuleUrlHelper.js",
                      "~/Scripts/app/services/AuthInterceptorService.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/angular-gridster.min.css",
                      "~/Content/content.min.css",
                      "~/Content/colorpicker.css",
                      "~/Content/site.css"));
        }
    }
}
