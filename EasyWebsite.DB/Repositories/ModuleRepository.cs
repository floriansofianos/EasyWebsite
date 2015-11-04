using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EasyWebsite.DB.Repositories
{
    public class ModuleRepository: IModuleRepository
    {
        private EasyWebsiteContext _context;

        public ModuleRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<Module> All
        {
            get { return _context.Modules; }
        }

        public IQueryable<Module> AllIncluding(params System.Linq.Expressions.Expression<Func<Module, object>>[] includeProperties)
        {
            IQueryable<Module> query = _context.Modules;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public void InsertOrUpdate(Module module)
        {
            if (module.Id == default(int))
            {
                // New Entity
                _context.Entry(module).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(module).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(Module moduleGraph)
        {
            if (moduleGraph.State == State.Added)
            {
                // New Entity
                _context.Modules.Add(moduleGraph);
            }
            else
            {
                // Existing User
                _context.Modules.Add(moduleGraph);
                _context.ApplyStateChanges();
            }
        }

        public Module Find(object id)
        {
            return _context.Modules.Find((int)id);
        }

        public void Delete(object id)
        {
            Module module = Find(id);
            module.IsDeleted = true;
            InsertOrUpdate(module);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

    public interface IModuleRepository: IRepository<Module>
    { }
}
