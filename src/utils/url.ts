//https://maku.blog/p/xjjbwes/
import Post from "@/type/Post";

/**
 * public ディレクトリ以下に配置したファイルを参照するための URL を取得します。
 *
 * 例: url('/img/sample.png') => /reponame/img/sample.png
 *
 * next.config.js の publicRuntimeConfig.urlPrefix プロパティで指定した文字列が、
 * filename 引数で指定された文字列のプレフィックスとして付加されます。
 * 例えば Web サイトを GitHub Pages のプロジェクトページなどで公開する場合、
 *
 *   https://username.github.io/reponame/
 *
 * のように、URL のドメイン直下がアプリのルートにならないため、
 * この URL 補正のために必要です。
 *
 * @see https://maku.blog/p/xjjbwes
 */
export default function url(filename: string | Post, abs?: boolean): string {
  if (typeof filename!=="string") {
    return url("/" + filename.date, abs);
  }
  if (abs) {
    return "https://lzpel.github.io" + url(filename);
  }
  return process.env.NEXT_PUBLIC_URL_PREFIX + filename;
}
