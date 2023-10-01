fs = require("fs")
const urlPrefix = process.env.NODE_ENV === "production" ? "/lzpel" : ""
const find = (dir, extension) => fs.readdirSync(dir, {withFileTypes: true}).flatMap(dirent => {
    // https://qiita.com/m_mitsuhide/items/23f8f3cfbf1f38c8e1cb
    const path=`${dir}/${dirent.name}`//以後 dirent.nameは使わない
    if (dirent.isSymbolicLink()){//symbolic linkならdirent入れ替え
        const link=`${dir}/${fs.readlinkSync(path)}`
        dirent=fs.lstatSync(link)
    }
    if (dirent.isFile()) {
        if ((!extension) || path.endsWith(extension)) {
            return [path]
        } else {
            return []
        }
    } else {
        return find(path, extension)
    }
})
const findChildren=(dir, extension)=>find(dir, extension).map(v=>v.replace(`${dir}/`, ""))

fs.writeFileSync("src/publicArticle.json", JSON.stringify(findChildren("public", ".md")))
const nextConfig = {
    output: 'export',//for static website
    assetPrefix: urlPrefix,
    basePath: urlPrefix,
    env: {
        NEXT_PUBLIC_URL_PREFIX: urlPrefix,
    },
}
module.exports = nextConfig
