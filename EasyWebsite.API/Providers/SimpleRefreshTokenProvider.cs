using EasyWebsite.DB.DataModel;
using EasyWebsite.DB.Repositories;
using Microsoft.Owin.Security.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using EasyWebsite.Library;
using EasyWebsite.DB;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using Microsoft.Owin.Security;

namespace EasyWebsite.API.Providers
{
    public class SimpleRefreshTokenProvider : IAuthenticationTokenProvider
    {
        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            var clientid = context.Ticket.Properties.Dictionary["as:client_id"];

            if (string.IsNullOrEmpty(clientid))
            {
                return;
            }

            var refreshTokenId = Guid.NewGuid().ToString("n");

            using (UnitOfWork _uow = new UnitOfWork())
            {
                var refreshTokenLifeTime = context.OwinContext.Get<string>("as:clientRefreshTokenLifeTime");

                var token = new RefreshToken()
                {
                    Id = refreshTokenId.GetHash(),
                    ClientId = clientid,
                    Subject = context.Ticket.Identity.Name,
                    IssuedUtc = DateTime.UtcNow,
                    ExpiresUtc = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTime))
                };

                context.Ticket.Properties.IssuedUtc = token.IssuedUtc;
                context.Ticket.Properties.ExpiresUtc = token.ExpiresUtc;

                token.ProtectedTicket = context.SerializeTicket();

                using (RefreshTokenRepository _repo = new RefreshTokenRepository(_uow))
                {
                    _repo.AddRefreshToken(token);
                    await _uow.SaveAsync();
                }

                context.SetToken(refreshTokenId);

            }
        }

        public void Create(AuthenticationTokenCreateContext context)
        {
            throw new NotImplementedException();
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            throw new NotImplementedException();
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {
            var allowedOrigin = context.OwinContext.Get<string>("as:clientAllowedOrigin");
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            string hashedTokenId = context.Token.GetHash();
            using(UnitOfWork uow = new UnitOfWork())
            {
                using (RefreshTokenRepository _repo = new RefreshTokenRepository(uow))
                {
                    var refreshToken = await _repo.FindRefreshToken(hashedTokenId);

                    if (refreshToken != null)
                    {
                        //Get protectedTicket from refreshToken class
                        context.DeserializeTicket(refreshToken.ProtectedTicket);
                        var result = await _repo.RemoveRefreshToken(hashedTokenId);
                    }
                }
            }
            
        }
    }
}