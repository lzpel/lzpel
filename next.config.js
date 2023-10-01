fs = require("fs")
const urlPrefix = process.env.NODE_ENV === "production" ? "/lzpel" : ""
const find = (dir, extension) => fs.readdirSync(dir, {withFileTypes: true}).flatMap(dirent => {
    // https://qiita.com/m_mitsuhide/items/23f8f3cfbf1f38c8e1cb
    if (dirent.isFile()) {
        if ((!extension) || dirent.name.endsWith(extension)) {
            return [`${dir}/${dirent.name}`]
        } else {
            return []
        }
    } else {
        return find(`${dir}/${dirent.name}`, extension)
    }
})
const findChildren=(dir, extension)=>find(dir, extension).map(v=>v.replace(`${dir}/`, ""))

fs.writeFileSync("src/publicArticle.json", JSON.stringify(findChildren("public", ".md")))

const nextConfig = {
    output: 'export',//for static website
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
    publicRuntimeConfig: {
        urlPrefix,// https://maku.blog/p/xjjbwes/
    },
}
module.exports = nextConfig
