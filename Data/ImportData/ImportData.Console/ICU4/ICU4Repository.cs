using System;
using ImportData.Repository;
using ImportData.Repository.SQLite;

namespace ImportData.Console.indiaeducation
{
    public class ICU4Repository: SqliteRepository
    {
        public ICU4Repository(IUnitOfWork uow) : 
            base(uow, config=>config.SetTableName("ICU4")
                .AddCol("UniNUniIdame", DataType.TEXT_NOT_NUll_UNIQUE)
                .AddCol("UniName", DataType.TEXT_NOT_NUll_UNIQUE)
                .AddCol("Rank", DataType.TEXT_NUll)
                .AddCol("Acronym", DataType.TEXT_NUll)
                .AddCol("Founded", DataType.TEXT_NUll)
                .AddCol("City", DataType.TEXT_NOT_NUll))
        { }


        public void InsertUni(object obj)
        {
            Insert(obj);
        }
    }
   
}
