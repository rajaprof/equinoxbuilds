/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://equinoxbuilds.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}
