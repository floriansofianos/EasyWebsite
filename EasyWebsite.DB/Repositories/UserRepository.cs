using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace EasyWebsite.DB.Repositories
{
    public class UserRepository: IUserRepository
    {
        private EasyWebsiteContext _context;

        public UserRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

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

        public User FindByUsername(string username)
        {
            return _context.Users.FirstOrDefault(u => !u.IsDeleted && u.UserName == username);
        }

        public bool UserHasRole(string username, string role)
        {
            var userStore = new UserStore<User>(_context);
            var userManager = new UserManager<User>(userStore);
            var currentUser = FindByUsername(username);
            if (currentUser == null) return false;
            else return (userManager.IsInRole(currentUser.Id, role) || userManager.IsInRole(currentUser.Id, "ROLE_ADMINISTRATOR"));
        }

        public void Delete(object id)
        {
            User user = _context.Users.Find((string)id);
            user.IsDeleted = false;
            InsertOrUpdate(user);
        }

        public void Dispose()
        {
            _context.Dispose();
        }        
    }

    public interface IUserRepository: IRepository<User>
    { }
}
