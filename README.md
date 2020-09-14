# HSE Digital Blog RSS
This Serverless function provides an RSS feed for the Health Service Executive's Digital Blog.

## Installing and using
* Configure your AWS account and make sure your credentials are accessible on your computer
* Install Node.js 12+

```bash
git clone git@github.com:conoro/hse-digital-blog-rss.git
cd hse-digital-blog-rss
npm install -g serverless
npm install
serverless deploy
```
Then you access the RSS feed like so:

```
https://url.of.serverless.function/dev/rss?page=https://www.hse.ie/eng/about/who/communications/digital/blog/
```

LICENSE Apache-2.0

Copyright Conor O'Neill 2020, conor@conoroneill.com
