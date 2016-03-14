using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EasyWebsite.DB.Repositories
{
    public class ModuleNameRepository: IModuleNameRepository
    {
        private EasyWebsiteContext _context;

        public ModuleNameRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<ModuleName> All
        {
            get { return _context.ModuleNames; }
        }

        public IQueryable<ModuleName> AllIncluding(params System.Linq.Expressions.Expression<Func<ModuleName, object>>[] includeProperties)
        {
            IQueryable<ModuleName> query = _context.ModuleNames;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public void InsertOrUpdate(ModuleName moduleName)
        {
            if (moduleName.Id == default(int))
            {
                // New Entity
                _context.Entry(moduleName).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(moduleName).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(ModuleName moduleNameGraph)
        {
            if (moduleNameGraph.State == State.Added)
            {
                // New Entity
                _context.ModuleNames.Add(moduleNameGraph);
            }
            else
            {
                // Existing User
                _context.ModuleNames.Add(moduleNameGraph);
                _context.ApplyStateChanges();
            }
        }

        public ModuleName Find(object id)
        {
            return _context.ModuleNames.Find((int)id);
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

    public interface IModuleNameRepository: IRepository<ModuleName>
    { }
}
