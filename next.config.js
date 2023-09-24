/** @type {import('next').NextConfig} */

//console.log(process.env);
const urlPrefix = process.env === "production" ? "/lzpel" : ""
const nextConfig = {
    output: 'export',//for static website
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
}
module.exports = nextConfig
