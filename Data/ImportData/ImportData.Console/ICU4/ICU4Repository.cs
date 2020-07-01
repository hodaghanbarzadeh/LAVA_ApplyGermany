using System;
using ImportData.Repository;
using ImportData.Repository.SQLite;

namespace ImportData.Console.indiaeducation
{
    public class ICU4Repository: SqliteRepository
    {
        public ICU4Repository(IUnitOfWork uow) : 
            base(uow, config=>new UniCrawler(null,null).ConfigRepository(config.SetTableName("ICU4")
                .AddCol("UniNUniIdame", DataType.TEXT_NOT_NUll_UNIQUE))
                
            )
        { }


        public void InsertUni(dynamic obj)
        {
            Insert(obj);
        }
    }
   
}
