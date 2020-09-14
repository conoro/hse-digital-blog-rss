// hse-digital-blog-rss - Copyright Conor O'Neill 2020, conor@conoroneill.com
// LICENSE Apache-2.0
// Invoke like https://url.of.serverless.function/dev/rss?page=https://www.hse.ie/eng/about/who/communications/digital/blog/

module.exports.check = (event, context, callback) => {
  var request = require("request");
  var cheerio = require("cheerio");
  var RSS = require("rss");
  var sectionURL = event.query.page;

  var feed = new RSS({
    title: "HSE Digital Blog RSS",
    description: "Returns the latest digital-related blog posts from Ireland's Health Service Executive",
    feed_url: "http://example.com/rss.xml",
    site_url: sectionURL,
    image_url:
      "https://www.hse.ie/MicroSiteV3/images/banners/hselogo.png",
    docs: "http://example.com/rss/docs.html",
    managingEditor: "conor@conoroneill.com",
    webMaster: "conor@conoroneill.com",
    copyright: "2020 Conor ONeill",
    language: "en",
    pubDate: "Sep 14, 2020 08:00:00 GMT",
    ttl: "60"
  });

  request(sectionURL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $(".social-item").each(function () {
        var link = "https://www.hse.ie" + $(this).find("a").attr("href");
        var img = "https://www.hse.ie" + $(this).find("img").attr("src");
        if (typeof img === 'undefined' || img === null || img === "https://www.hse.ie") img = "https://www.hse.ie/MicroSiteV3/images/banners/hselogo.png";
        if (link.indexOf(sectionURL) > -1) {
          var title = $(this).find("h3").text();
          if (typeof title === 'undefined' || title === null) title = "No Title Found";
          var summary = $(this).find("p").text();
          if (typeof summary === 'undefined' || summary === null) summary = "No Summary Found";
          var description = '<img src="' + img + '" alt="' + title + '" /> ' + summary;
          var articleDate = new Date($(this).find("time").attr("datetime"));
          if (typeof articleDate === 'undefined' || articleDate === null) articleDate = new Date();
          feed.item({
            title: title,
            description: description,
            url: link,
            author: "hse@example.com",
            date: articleDate.toUTCString()
          });
        }
      });
      var xml = feed.xml();
      context.succeed(xml);
    }
  });
};
