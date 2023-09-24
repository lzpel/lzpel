/** @type {import('next').NextConfig} */

//console.log(process.env);
const urlPrefix = process.env.NODE_ENV === "production" ? "/lzpel" : ""
console.log(urlPrefix)
const nextConfig = {
    output: 'export',//for static website
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
    publicRuntimeConfig: { urlPrefix },  // https://maku.blog/p/xjjbwes/
}
module.exports = nextConfig
