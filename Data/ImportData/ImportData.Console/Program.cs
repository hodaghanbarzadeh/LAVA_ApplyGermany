using ImportData.Console.ICU4;
using ImportData.Console.indiaeducation;
using ImportData.Crawler;
using ImportData.Repository;
using ImportData.Repository.Indiaeducation;
using ImportData.Repository.SQLite;
using System;
using System.IO;

namespace ImportData.Console
{
    class Program
    {
        static void Main2()
        {
            dynamic a = 1;

            a.name = 2;
        }
        static void Main(string[] args)
        {
            var dbFile = "resultData.db";
            if (File.Exists(dbFile))
                File.Delete(dbFile);
            using (IUnitOfWork uow = new SQLiteUnitOfwork(dbFile))
            {
                var list = WebCrawler.Crawl<ICU4Crawler>("https://www.4icu.org/de/a-z/", "/html/body/div[2]/div/div[2]/div/table/tbody/tr");
                var rep1 = new ICU4Repository(uow);
                try
                {
                    uow.BeginTrans();
                    foreach (dynamic d in list)
                    {
                        System.Console.WriteLine($"{d.UniId} - {d.UniName} - {d.City} - {d.Rank} - {d.Acronym} - {d.Founded}");
                        //rep1.InsertUni(d);
                    }
                    uow.Commit();
                }
                catch (System.Exception ex)
                {

                    throw;
                }

                list = WebCrawler.Crawl<IndiaeducationCrawler>("https://www.indiaeducation.net/studyabroad/germany/list-of-universities-a-f.aspx",
                   "/div[@id=\"artBody\"]/ul[]/li[]/a");
                var rep2 = new IndiaeducationRepository(uow);
                try
                {
                    uow.BeginTrans();
                    foreach (dynamic d in list)
                    {
                        //rep2.InsertUni(d);
                        System.Console.WriteLine($"{d.UniId} - {d.UniName} - {d.City} - {d.Rank}  - {d.Founded}");
                    }
                    uow.Commit();
                }
                catch (System.Exception ex)
                {

                    throw;
                }
            }
            //var rep = new UniRepository("CollectData.sqlite");
            //using (var uow=rep.CreateUOW())
            //{
            //    uow.BeginTrans();

            //    rep.InsertUni(new { UniName="Test Uni 1", Rank=1, City="Test City" });

            //    uow.Commit();

            //    uow.BeginTrans();

            //    rep.InsertUni(new { UniName="Test Uni 1", Rank=1, City="Test City" });

            //    uow.Commit();
            //}
        }
    }
}
