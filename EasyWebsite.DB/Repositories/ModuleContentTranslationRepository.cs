using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.Repositories
{
    public class ModuleContentTranslationRepository: IModuleContentTranslationRepository
    {
        private EasyWebsiteContext _context;

        public ModuleContentTranslationRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<ModuleContentTranslation> All
        {
            get { throw new NotImplementedException(); }
        }

        public IQueryable<ModuleContentTranslation> AllIncluding(params System.Linq.Expressions.Expression<Func<ModuleContentTranslation, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public ModuleContentTranslation Find(object id)
        {
            throw new NotImplementedException();
        }

        public void InsertOrUpdate(ModuleContentTranslation translation)
        {
            if (translation.Id == default(int))
            {
                // New Entity
                _context.Entry(translation).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(translation).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(ModuleContentTranslation entityGraph)
        {
            throw new NotImplementedException();
        }

        public void Delete(object id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }

    public interface IModuleContentTranslationRepository : IRepository<ModuleContentTranslation>
    { }
}
