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

add .github/workflows/nextjs.yml https://github.com/actions/starter-workflows/blob/main/pages/nextjs.yml

一つしかパスを指定しないならカレントディレクトリに同名でシンボリックリンクが作成される
cd public && ln -s ../items