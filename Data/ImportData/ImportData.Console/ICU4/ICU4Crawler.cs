using ImportData.Crawler;
using HtmlAgilityPack;

namespace ImportData.Console.ICU4
{
    public class ICU4Crawler : ListWebCrawler<UniCrawler>
    {

        public ICU4Crawler( string source, string path) : base( source, path)
        {
        }
        protected override UniCrawler ParseModel(HtmlNode node)
        {
            return new UniCrawler( node.OuterHtml, "//tr");
            //return new UniCrawler("https://www.4icu.org" + node.GetAttributeValue("href", ""), "/html/body/div[3]");
        }
    }
    public class UniCrawler : ObjWebCrawler
    {
        public UniCrawler(string source, string path)
            : base(source, path
                  , (config) => config
                  .AddPath("UniId", node => new IUC4UniIdWebCrawler(node.InnerHtml, "//td[2]/a"))
                  .AddPath("UniName", node => new StringWebCrawler(node.InnerHtml, "//td[2]/a"))
                  .AddPath("Acronym", node => new StringWebCrawler("https://www.4icu.org" + node.SelectSingleNode("//td[2]/a").GetAttributeValue("href", ""), "//html/body/div[3]/div[3]/div[1]/div/div[2]/table/tbody/tr[3]/td/abbr"))
                  .AddPath("Founded", node => new StringWebCrawler("https://www.4icu.org" + node.SelectSingleNode("//td[2]/a").GetAttributeValue("href", ""), "//html/body/div[3]/div[3]/div[1]/div/div[2]/table/tbody/tr[4]/td/span"))
                  .AddPath("City", node => new StringWebCrawler(node.InnerHtml, "//td[3]"))
                  .AddPath("Rank", node => new StringWebCrawler(node.InnerHtml, "//td[1]/b")))
        {

        }
    }
    public class IUC4UniIdWebCrawler : StringWebCrawler
    {
        public IUC4UniIdWebCrawler(string source, string path) : base(source, path)
        {
        }
        protected override string ConvertValue(HtmlNode document)
        {
            return document.GetAttributeValue("href", "").Split("/")[2].Split(".")[0];
        }
    }
}
