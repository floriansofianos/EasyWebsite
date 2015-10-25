using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EasyWebsite.DB.Repositories
{
    public class SiteSettingsRepository: ISiteSettingsRepository
    {
        private EasyWebsiteContext _context;

        public SiteSettingsRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<SiteSetting> All
        {
            get 
            { 
                return _context.SiteSettings; 
            }
        }

        public IQueryable<SiteSetting> AllIncluding(params System.Linq.Expressions.Expression<Func<SiteSetting, object>>[] includeProperties)
        {
            IQueryable<SiteSetting> query = _context.SiteSettings;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public SiteSetting Find(object id)
        {
            return _context.SiteSettings.Find((int)id);
        }

        public void InsertOrUpdate(SiteSetting siteSetting)
        {
            if (siteSetting.Id == default(int))
            {
                // New Entity
                _context.Entry(siteSetting).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(siteSetting).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(SiteSetting siteSettingGraph)
        {
            if (siteSettingGraph.State == State.Added)
            {
                // New Entity
                _context.SiteSettings.Add(siteSettingGraph);
            }
            else
            {
                // Existing User
                _context.SiteSettings.Add(siteSettingGraph);
                _context.ApplyStateChanges();
            }
        }

        public void Delete(object id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

    public interface ISiteSettingsRepository : IRepository<SiteSetting>
    { }
}
