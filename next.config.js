/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',//https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
}
if(process.env.REPOSITORY_NAME){
    nextConfig.assetPrefix="/"+process.env.REPOSITORY_NAME
}

module.exports = nextConfig
