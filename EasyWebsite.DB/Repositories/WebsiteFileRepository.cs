using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.Repositories
{
    public class WebsiteFileRepository: IWebsiteFileRepository
    {
        private EasyWebsiteContext _context;

        public WebsiteFileRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<WebsiteFile> All
        {
            get { throw new NotImplementedException(); }
        }

        public IQueryable<WebsiteFile> AllIncluding(params System.Linq.Expressions.Expression<Func<WebsiteFile, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public WebsiteFile Find(object id)
        {
            return _context.WebsiteFiles.Find((Guid)id);
        }

        public void InsertOrUpdate(WebsiteFile websiteFile)
        {
            if (Find(websiteFile.Id) == null)
            {
                // New Entity
                _context.Entry(websiteFile).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(websiteFile).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(WebsiteFile websiteFileGraph)
        {
            if (websiteFileGraph.Id == default(Guid))
            {
                // New Entity
                _context.WebsiteFiles.Add(websiteFileGraph);
            }
            else
            {
                // Existing File
                websiteFileGraph.State = State.Modified;
                _context.WebsiteFiles.Add(websiteFileGraph);
                _context.ApplyStateChanges();
            }
        }

        public void Delete(object id)
        {
            WebsiteFile websiteFile = Find(id);
            websiteFile.IsDeleted = true;
            InsertOrUpdate(websiteFile);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

    public interface IWebsiteFileRepository : IRepository<WebsiteFile>
    { }
}
