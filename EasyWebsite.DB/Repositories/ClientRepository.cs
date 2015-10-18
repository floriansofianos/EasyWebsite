using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.Repositories
{
    public class ClientRepository: IClientRepository
    {
        private EasyWebsiteContext _context;

        public ClientRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<Client> All
        {
            get 
            { 
                return _context.Clients.Where(c => c.Active);          
            }
        }

        public IQueryable<Client> AllIncluding(params System.Linq.Expressions.Expression<Func<Client, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public Client Find(object id)
        {
            return _context.Clients.Find((string)id);
        }

        public void InsertOrUpdate(Client entity)
        {
            throw new NotImplementedException();
        }

        public void InsertOrUpdateGraph(Client entityGraph)
        {
            throw new NotImplementedException();
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

    public interface IClientRepository : IRepository<Client>
    { }
}
