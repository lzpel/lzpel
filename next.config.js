/** @type {import('next').NextConfig} */
var fs = require('fs');

//console.log(process.env);
const urlPrefix = process.env.NODE_ENV === "production" ? "/lzpel" : ""
const items = fs.readdirSync('note');
console.log(items)

const nextConfig = {
    output: 'export',//for static website
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
    publicRuntimeConfig: { urlPrefix },  // https://maku.blog/p/xjjbwes/
}
module.exports = nextConfig
