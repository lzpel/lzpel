/** @type {import('next').NextConfig} */
const urlPrefix = '/lzpel'
const nextConfig = {
    output: 'export',//https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
}

module.exports = nextConfig
