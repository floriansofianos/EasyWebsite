using EasyWebsite.DB;
using EasyWebsite.DB.Repositories;
using System.Web;
using System.Web.Optimization;
using System.Linq;

namespace EasyWebsite.API
{
    public class BundleConfig
    {
        // Pour plus d’informations sur le regroupement, rendez-vous sur http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/slick.min.js"));

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
                      "~/Scripts/angular-touch.min.js",
                      "~/Scripts/angular-slick.min.js",
                      "~/Scripts/angular-simple-logger.min.js",
                      "~/Scripts/angular-google-maps.min.js",
                      "~/Scripts/ui-bootstrap-tpls-0.14.3.min.js",
                      "~/Scripts/angular-route.min.js",
                       "~/Scripts/angular-carousel.min.js",
                      "~/Scripts/ng-file-upload.min.js",
                      "~/Scripts/select-ui.min.js",
                      "~/Scripts/angular-navbar.js",
                      "~/Scripts/bootstrap-colorpicker-module.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                      "~/Scripts/app/modules/app.settings.js",
                      "~/Scripts/app/modules/App.js",
                      "~/Scripts/app/modules/app.menu.js",
                      "~/Scripts/app/modules/app.dashboard.js",
                      "~/Scripts/app/modules/app.image.picker.js",
                      "~/Scripts/app/directives/TopMenu.js",
                      "~/Scripts/app/directives/ewDashboard.js",
                      "~/Scripts/app/directives/ewStaticDashboard.js",
                      "~/Scripts/app/directives/ewImagePicker.js",
                      "~/Scripts/app/directives/ModuleUrl.js",
                      "~/Scripts/app/directives/dynamic.js",
                      "~/Scripts/app/directives/ewNewsPage.js",
                      "~/Scripts/app/directives/ewSingleNewsPage.js",
                      "~/Scripts/app/directives/ewFooter.js",
                      "~/Scripts/app/directives/ewModuleNews.js",
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
                      "~/Scripts/app/controllers/ModalContentCardController.js",
                      "~/Scripts/app/controllers/ModalContentWidgetController.js",
                      "~/Scripts/app/controllers/ModalContentCarouselController.js",
                      "~/Scripts/app/controllers/ModalContentMapController.js",
                      "~/Scripts/app/controllers/ModalContentImageController.js",
                       "~/Scripts/app/controllers/ModalContentModuleController.js",
                      "~/Scripts/app/controllers/ImagePickerController.js",
                      "~/Scripts/app/controllers/NewsPageController.js",
                      "~/Scripts/app/controllers/SingleNewsPageController.js",
                      "~/Scripts/app/controllers/ModuleNewsController.js",
                      "~/Scripts/app/controllers/FooterController.js",
                      "~/Scripts/app/services/AuthService.js",
                      "~/Scripts/app/services/RoutingHelper.js",
                      "~/Scripts/app/services/TopMenuHelper.js",
                      "~/Scripts/app/services/ModuleHelper.js",
                      "~/Scripts/app/services/ModuleContentHelper.js",
                      "~/Scripts/app/services/ModuleTypeHelper.js",
                      "~/Scripts/app/services/ModuleContentTypeHelper.js",
                      "~/Scripts/app/services/ModuleUrlHelper.js",
                      "~/Scripts/app/services/WebsiteFileHelper.js",
                      "~/Scripts/app/services/ImagePickerHelper.js",
                      "~/Scripts/app/services/NewsHelper.js",
                      "~/Scripts/app/services/UserHelper.js",
                      "~/Scripts/app/services/LanguageHelper.js",
                      "~/Scripts/app/services/SettingsHelper.js",
                      "~/Scripts/app/services/PermissionHelper.js",
                      "~/Scripts/app/services/AuthInterceptorService.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/angular-gridster.min.css",
                      "~/Content/content.min.css",
                      "~/Content/colorpicker.css",
                      "~/Content/angular-carousel.min.css",
                      "~/Content/slick.css",
                      "~/Content/select-ui.min.css",
                      "~/Content/select2.css",
                      "~/Content/angular-navbar.css",
                      "~/Content/site.css"));

            UnitOfWork UnitOfWork = new UnitOfWork();
            using(SiteSettingsRepository _repo = new SiteSettingsRepository(UnitOfWork))
            {
                var cssTheme = _repo.All.FirstOrDefault(s => s.Key == "theme");
                if(cssTheme != null)
                {
                    bundles.Add(new StyleBundle("~/Content/theme").Include(
                        string.Format("~/Content/{0}.css", cssTheme.Value)
                    ));
                }
            }
        }
    }
}
