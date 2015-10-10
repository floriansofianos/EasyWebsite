using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EasyWebsite.DB.Repositories
{
    public class NewsRepository: INewsRepository
    {
        private EasyWebsiteContext _context;

        public NewsRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<News> All
        {
            get { return _context.News; }
        }

        public IQueryable<News> AllIncluding(params System.Linq.Expressions.Expression<Func<News, object>>[] includeProperties)
        {
            IQueryable<News> query = _context.News;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public void InsertOrUpdate(News news)
        {
            if (news.Id == default(int))
            {
                // New Entity
                _context.Entry(news).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(news).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(News newsGraph)
        {
            if (newsGraph.State == State.Added)
            {
                // New Entity
                _context.News.Add(newsGraph);
            }
            else
            {
                // Existing User
                _context.News.Add(newsGraph);
                _context.ApplyStateChanges();
            }
        }

        public News Find(object id)
        {
            return _context.News.Find((int)id);
        }

        public void Delete(object id)
        {
            News news = _context.News.Find((int)id);
            news.IsDeleted = true;
            InsertOrUpdate(news);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

    public interface INewsRepository : IRepository<News>
    { }
}
