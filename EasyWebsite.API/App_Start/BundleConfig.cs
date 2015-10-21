﻿using System.Web;
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
                      "~/Scripts/respond.js"));

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
                      "~/Scripts/angular-route.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                      "~/Scripts/app/modules/App.js",
                      "~/Scripts/app/modules/app.menu.js",
                      "~/Scripts/app/directives/TopMenu.js",
                      "~/Scripts/app/directives/TopMenuItem.js",
                      "~/Scripts/app/controllers/HomePage.js",
                      "~/Scripts/app/controllers/LoginPage.js",
                      "~/Scripts/app/controllers/AdminPage.js",
                      "~/Scripts/app/controllers/TopMenu.js",
                      "~/Scripts/app/services/AuthService.js",
                      "~/Scripts/app/services/RoutingHelper.js",
                      "~/Scripts/app/services/TopMenuHelper.js",
                      "~/Scripts/app/services/AuthInterceptorService.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
