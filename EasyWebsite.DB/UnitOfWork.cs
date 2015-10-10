using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EasyWebsite.DB
{
    public class UnitOfWork: IDisposable
    {
        private readonly EasyWebsiteContext _context;

        public UnitOfWork()
        {
            _context = new EasyWebsiteContext();
        }

        public UnitOfWork(EasyWebsiteContext context)
        {
            _context = context;
        }

        public int Save()
        {
            return _context.SaveChanges();
        }

        public EasyWebsiteContext Context
        {
            get { return _context; }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
