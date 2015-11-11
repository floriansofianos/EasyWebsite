using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.Repositories
{
    public class ModuleContentRepository: IModuleContentRepository
    {
        private EasyWebsiteContext _context;

        public ModuleContentRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<ModuleContent> All
        {
            get { throw new NotImplementedException(); }
        }

        public IQueryable<ModuleContent> AllIncluding(params System.Linq.Expressions.Expression<Func<ModuleContent, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public ModuleContent Find(object id)
        {
            return _context.ModuleContents.Find((int)id);
        }

        public void InsertOrUpdate(ModuleContent moduleContent)
        {
            if (moduleContent.Id == default(int))
            {
                // New Entity
                _context.Entry(moduleContent).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(moduleContent).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(ModuleContent moduleContentGraph)
        {
            if (moduleContentGraph.Id == default(int))
            {
                // New Entity
                _context.ModuleContents.Add(moduleContentGraph);
            }
            else
            {
                // Existing User
                moduleContentGraph.State = State.Modified;
                _context.ModuleContents.Add(moduleContentGraph);
                _context.ApplyStateChanges();
            }
        }

        public void Delete(object id)
        {
            ModuleContent moduleContent = Find(id);
            moduleContent.IsDeleted = true;
            InsertOrUpdate(moduleContent);
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

    public interface IModuleContentRepository : IRepository<ModuleContent>
    { }
}
