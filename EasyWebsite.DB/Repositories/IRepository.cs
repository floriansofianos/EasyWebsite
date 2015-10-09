using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.Repositories
{
    public interface IRepository<T>: IDisposable
    {
        IQueryable<T> All { get; }
        IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);
        T Find(object id);
        void InsertOrUpdate(T entity);
        void InsertOrUpdateGraph(T entityGraph);
        void Delete(object id);
        void Save();
    }
}
