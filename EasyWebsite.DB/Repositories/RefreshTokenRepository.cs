using EasyWebsite.DB.DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB.Repositories
{
    public class RefreshTokenRepository: IRefreshTokenRepository
    {
        private EasyWebsiteContext _context;

        public RefreshTokenRepository(UnitOfWork uow)
        {
            _context = uow.Context;
        }

        public IQueryable<RefreshToken> All
        {
            get 
            { 
                return _context.RefreshTokens.Where(t => t.ExpiresUtc > DateTime.UtcNow); 
            }
        }

        public IQueryable<RefreshToken> AllIncluding(params System.Linq.Expressions.Expression<Func<RefreshToken, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }

        public RefreshToken Find(object id)
        {
            return _context.RefreshTokens.Find((string)id);
        }

        public void AddRefreshToken(RefreshToken token)
        {
            var existingToken = _context.RefreshTokens.Where(r => r.Subject == token.Subject && r.ClientId == token.ClientId).SingleOrDefault();

            if (existingToken != null)
            {
                Delete(existingToken);
            }

            _context.RefreshTokens.Add(token);
        }

        public void InsertOrUpdate(RefreshToken entity)
        {
            throw new NotImplementedException();
        }

        public void InsertOrUpdateGraph(RefreshToken entityGraph)
        {
            throw new NotImplementedException();
        }

        public void Delete(object id)
        {
            var refreshToken = _context.RefreshTokens.Find((string)id);
            Delete(refreshToken);
        }

        public void Delete(RefreshToken token)
        {
            _context.RefreshTokens.Remove(token);
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _context.RefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = await _context.RefreshTokens.FindAsync(refreshTokenId);

            if (refreshToken != null)
            {
                _context.RefreshTokens.Remove(refreshToken);
                return await _context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

    public interface IRefreshTokenRepository : IRepository<RefreshToken>
    { }
}
