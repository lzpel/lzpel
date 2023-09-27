/** @type {import('next').NextConfig} */
var fs = require('fs');

//console.log(process.env);
const urlPrefix = process.env.NODE_ENV === "production" ? "/lzpel" : ""
const note = fs.readdirSync('note').map(v=>("/note/"+v));
console.log(note)

const nextConfig = {
    output: 'export',//for static website
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
    publicRuntimeConfig: {
        urlPrefix,// https://maku.blog/p/xjjbwes/
        note
    },
}
module.exports = nextConfig
