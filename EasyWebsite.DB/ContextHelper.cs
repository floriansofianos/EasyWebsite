using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EasyWebsite.DB.DataModel;

namespace EasyWebsite.DB
{
    public static class ContextHelper
    {
        public static void ApplyStateChanges(this DbContext context)
        {
            foreach (var entry in context.ChangeTracker.Entries<IObjectWithState>())
            {
                IObjectWithState stateInfo = entry.Entity;
                entry.State = StateHelper.ConvertState(stateInfo.State);
            }
        }
    }
}
