using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace EasyWebsite.DB.Repositories
{
    public class UserRepository: IUserRepository
    {
        private EasyWebsiteContext _context = new EasyWebsiteContext();

        public IQueryable<User> All
        {
            get { return _context.Users; }
        }

        public IQueryable<User> AllIncluding(params System.Linq.Expressions.Expression<Func<User, object>>[] includeProperties)
        {
            IQueryable<User> query = _context.Users;
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public void InsertOrUpdate(User user)
        {
            if (user.Id == default(string))
            {
                // New Entity
                _context.Entry(user).State = EntityState.Added;
            }
            else
            {
                // Existing User
                _context.Entry(user).State = EntityState.Modified;
            }
        }

        public void InsertOrUpdateGraph(User userGraph)
        {
            if (userGraph.State == State.Added)
            {
                // New Entity
                _context.Users.Add(userGraph);
            }
            else
            {
                // Existing User
                _context.Users.Add(userGraph);
                _context.ApplyStateChanges();
            }
        }

        public User Find(object id)
        {
            return _context.Users.Find((string)id);
        }

        public void Delete(object id)
        {
            User user = _context.Users.Find((string)id);
            user.Enabled = false;
            _context.Entry(user).State = EntityState.Modified;
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }        
    }

    public interface IUserRepository: IRepository<User>
    { }
}
