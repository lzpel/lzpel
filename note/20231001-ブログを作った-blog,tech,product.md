ブログをnextjsで作りました。

コンセプトは「github-pagesに乗るブログ」
これを実現するため以下の特徴を備えています。

1. github-pagesに乗せるため静的なファイル配信しかしない
2. Githubでも表示できるMarkdownでブログを書く
3. CI/CD機能を用いてgit pushでビルド＆デプロイする仕掛けを作る

誰も見ないかもしれませんが、日々更新する予定です。

## 以下製作メモ

### アプリ作成

```shell
smith@DESKTOP-F8JCPGN:~/lzpel$ npx create-next-app@latest
✔ What is your project named? … .
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias? … No / Yes
Creating a new Next.js app in /home/smith/lzpel.
```

### workflowによるCI/CD

add .github/workflows/nextjs.yml

https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml

### シンボリックリンクを用いて記事のパスを通す

一つしかパスを指定しないならカレントディレクトリに同名でシンボリックリンクが作成される
cd public && ln -s ../note

### デザイン 決定事項

material-uiを用いる

xs(~600px): スマホ用
sm~(600~px): パソコン用