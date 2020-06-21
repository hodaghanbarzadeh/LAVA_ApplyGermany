using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ImportData.Crawler
{
    public class ListWebCrawler<TCrawler> : WebCrawler where TCrawler : WebCrawler
    {
        dynamic value = null;

        protected IEnumerable<TCrawler> Crawlers { get; private set; }
        protected IEnumerable<HtmlNode> Nodes { get; private set; }



        protected ListWebCrawler(string source, string path) : base(source, path)
        {

        }

        protected virtual List<HtmlNode> GetNods(HtmlNode document)
        {
            var paths = Path.Split(new[] { "[]" },  StringSplitOptions.None);
            var enumerator = paths.GetEnumerator();
            enumerator.Reset();
            enumerator.MoveNext();
            var nodes = document.SelectNodes((string)enumerator.Current)?.AsEnumerable()??new HtmlNode[0];
            while (enumerator.MoveNext())
                nodes = nodes.SelectMany(node => node.SelectNodes("/" + (string)enumerator.Current));
            return nodes?.ToList() ?? new List<HtmlNode>();
        }

        internal protected override sealed void Init(ICrawlerProvider provider)
        {
            Nodes = GetNods(provider.GetDocument(Source));//.Take(40);

            Crawlers = ParseNodes(provider);
        }

        private IEnumerable<TCrawler> ParseNodes(ICrawlerProvider provider)
        {
            foreach (var node in Nodes)
            {
                var obj = ParseModel(node);
                if (obj != null)
                {
                    obj.Init(provider);
                    yield return obj;

                }
            }
        }

        protected virtual TCrawler ParseModel(HtmlNode node)
        {
            return (TCrawler)Activator.CreateInstance(typeof(TCrawler), node.OuterHtml,$"/{node.OriginalName}");
        }

        private IEnumerable<dynamic> GetListValue()
        {
            foreach (var crawlObj in Crawlers)
                yield return crawlObj.Value;
        }

        public override dynamic Value
        {
            get
            {
                if (value is null)
                {

                    value = GetListValue();
                }
                return value;
            }
        }

    }
}
