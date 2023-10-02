ブログをnextjsで作りました。

コンセプトは「github-pagesに乗るブログ」
これを実現するため以下の特徴を備えています。

1. github-pagesに乗せるため静的なファイル配信しかしない
2. Githubでも表示できるMarkdownでブログを書く
3. CI/CD機能を用いてgit pushでビルド＆デプロイする仕掛けを作る

コンテンツの方向性としては以下のサイトを参考にしています
- https://memo.wass80.xyz/

誰も見ないかもしれませんが、日々更新する予定です。

## latex のテスト

MPS法(Moving Particle Semi-implicit)による非圧縮性流体ソルバーの簡単な実装を組んでみたもの。数値流体力学への理解を深めるのが目的。

![img](https://user-images.githubusercontent.com/18492524/164473888-4d1a4f02-d8a8-4b65-b9b3-3ec13cb300c4.gif)

### 理論的背景

流体解析は，連続体としての流体を有限個の離散点で表現し，計算点上に定義される物理量を用いて代数方程式化（離散化）された支配方程式を解くことで行われる．
その解析手法は大きく分けて粒子法と格子法の二種類が存在する．
格子法は計算対象空間を格子状に分割しそれぞれに物理量の変数を割り当てて計算する．
格子法では連続体はEuler法で記述される．
一方で，粒子法は計算空間に配置された粒子に物理量を表す変数を割り当てて計算する．
粒子法では連続体はLagrange法で記述され，計算点（粒子）が物理量を保持したまま移動することで流体挙動を表現する．

支配方程式は非圧縮流れの連続式及び運動方程式(Navier-Stokes方程式)である．
非圧縮流れの連続式を次式に示す
$$\frac{D\rho}{Dt}+\rho\nabla\cdot\boldsymbol{u}=0$$
ここに， $\rho$ :密度， $t$ :時間， $\boldsymbol{u}$ :流速ベクトルである．
非圧縮流れの運動方程式はLagrange法では次式で記述される．

$$\rho\frac{D \boldsymbol{u}}{D t}=-\nabla p + \mu \nabla^2 \boldsymbol{u} + \rho \boldsymbol{g} + \boldsymbol{F}_{int}$$

ここに， $p$ :圧力， $\boldsymbol{g}$ :重力加速度ベクトル， $\boldsymbol{F}_{int}$ :体積当たりの外力，である．

本稿では流体解析に粒子法の一種であるMPS法を基礎とした高精度粒子法を用いる．
粒子法は物理量の定義点である粒子が流れに沿い移動するLagrange的な手法であり，移流項を排して取り扱うことができる．そのため格子法で問題となる移流項の離散化に伴う数値拡散や数値振動が生じない．また粒子法では相互作用計算時の近傍関係が時々刻々と更新されることから，界面の大変形や結合，分裂などの取り扱いに優れており砕波等の流体表面の大変形を伴う流れを容易に取り扱うことができる．

#### 標準MPS法

本節では標準MPS法の計算手順を説明する．MPS法は非圧縮性流れに対してSMAC(Simplified MAC)法と同様の，半陰的アルゴリズム（二段階法）で計算する．
流速ベクトル  $\boldsymbol{u}$  と，位置ベクトル  $\boldsymbol{r}$  の更新は次式のように計算ステップにつき二段階で行う．第一段階においては外力項と粘性項の陽的計算を通して導かれた修正速度ベクトル  $\delta\boldsymbol{u}^p$  (  $p$  :第一段階を示す)で更新し，第二段階においては陰的解法を通して導かれる圧力を用いた圧力勾配項による修正速度ベクトル  $\delta\boldsymbol{u}^c$  (  $c$  :第二段階を示す)で更新する．

$$\boldsymbol{u}^\ast = \boldsymbol{u}^k+\delta\boldsymbol{u}^p$$

$$\boldsymbol{u}^{k+1} = \boldsymbol{u}^\ast+\delta\boldsymbol{u}^c$$

$$\boldsymbol{r}^\ast = \boldsymbol{r}^k+\boldsymbol{u}^k\Delta t+\delta\boldsymbol{u}^p\Delta t$$

$$\boldsymbol{r}^{k+1} = \boldsymbol{r}^\ast+\delta\boldsymbol{u}^c\Delta t$$

なお， $\Delta t$ は計算ステップの時間間隔，添字 $k$ は計算ステップを示す．各計算段階を以下に詳述する．

##### 第一段階

全流体粒子の第一段階の修正速度ベクトル $\delta\boldsymbol{u}^p$ は重力項(外力項)及び粘性項を用いて陽解法で求める．
$$\delta\boldsymbol{u}^p=\Delta t\left(\nu\nabla^2\boldsymbol{u}+\boldsymbol{g}\right)$$
ここに， $\nu$ は流体の動粘性係数， $\boldsymbol{g}$ は重力(外力)である．
上式の離散化において，当該粒子 $i$ の粘性項のLaplacian( $\nabla^2$ )は以下に示すMPS法のLaplacianモデルによって離散化される．

$$\langle \nabla^2 \boldsymbol{u} \rangle_i^k=\frac{2 D_s}{\lambda n_0}\sum_{j \neq i}\left[(\boldsymbol{u}^k_j-\boldsymbol{u}^k_i)w(|\boldsymbol{r}^k_{ij}|)\right]$$

ここに， $D_s$ は空間次元数であり，3次元計算なら $D_s=3$ である． $n_0$ は初期粒子数密度， $\lambda$ は距離の二乗の重み平均であり，統計的な分散の増加を解析解と一致させるために導入される係数である．下付き文字 $i$ ， $j$ はそれぞれ， $i$ は注目する当該粒子， $j$ は当該粒子 $i$ の近傍粒子を示す． $\boldsymbol{r}\_{ij}$ は粒子 $i,j$ 間の相対位置ベクトル( $\boldsymbol{r}\_{ij}=\boldsymbol{r}\_{j}-\boldsymbol{r}\_{i}$ )である． $w(|\boldsymbol{r}^k_{ij}|)$ は重み関数（kernel）であり粒子間距離 $|\boldsymbol{r}^k_{ij}|$ の関数である．初期粒子数密度 $n_0$ 及び係数 $\lambda$ は計算開始時に規則配列下で以下の二式を用いて計算される．

$$n_0=\sum_{j\neq i}w(|\boldsymbol{r}_{ij}|)$$

$$\lambda=\frac{\sum_{j\neq i}\left[|\boldsymbol{r}_{ij}|^2 w(|\boldsymbol{r}_{ij}|)\right]}{\sum_{j\neq i}w(|\boldsymbol{r}_{ij}|)}$$

重み関数 $w(r)$ は本稿では次式を用いた．

```math
w\left(r\right)=\left\{ \begin{array}{ll} \dfrac{r_e}{r}-1 & (0 \le r < r_e) \\ 0 & ( r_e \le r )\end{array}\right.
```

ここに， $r_e$ は影響半径である．粒子間の相互作用は粒子間距離が $r_e$ より小さい場合に計算され，各粒子間の接続関係が有限範囲で取り扱われる．本稿では $r_e=2.4d$ （ $d$ ：粒径）を影響半径として与えた

##### 第二段階

第一段階の計算終了時点では粒子数密度は初期粒子数密度とは異なる．第二段階では第一段階で除外された圧力勾配項が質量保存則を満たすように，すなわち粒子数密度を一定値に保つように圧力勾配項が働くことで連続体の非圧縮条件が満たされる．

当該粒子 $i$ の粒子数密度は次式で定義される．

$$n=\sum_{j\neq i}w(|\boldsymbol{r}_{ij}|)$$

先に述べたように規則配列時の粒子数密度を初期粒子数密度 $n_0$ とし，非圧縮流体では第二段階終了時点で次式が満たされるように計算が進められる．

$$n_0=n^{k+1}=n^\ast+n^c$$

ここに， $n^\ast$ は第一段階終了時の粒子数密度， $n^c$ は第二段階での粒子数密度の修正値である．

第二段階での速度修正量 $\delta\boldsymbol{u}^c$ は次式のように表される．

$$\delta\boldsymbol{u}^c=-\frac{\Delta t}{\rho} \nabla p^{k+1}$$

圧力勾配項の離散化は次式の勾配モデルが用いられる．

$$\langle \nabla p \rangle^{k+1}\_i = \frac{D_s}{n_0}\sum\_{j \neq i} \left(\frac{p^{k+1}\_j-\hat{p}^{k+1}\_i}{|\boldsymbol{r}^\ast\_{ij}|^2}\boldsymbol{r}^\ast_{ij}w(|\boldsymbol{r}^\ast_{ij}|)\right)$$

$$\hat{p}\_i = \min\_{j \in J}(p_i,p_j)$$
$$J = \left(j:|\boldsymbol{r}^\ast_{ij}|<r_e\right)$$

なお，標準MPS法の圧力勾配モデルは，数値安定性を保つために粒子間力が常に非負（排斥力）となることを保証する． $\hat{p}_i$ は粒子 $i$ とその近傍粒子 $j$ の中での最小圧力値であり $p^{k+1}_j-\hat{p}^{k+1}_i$ は必ず非負となる．

密度 $\rho_i$ が粒子数密度 $n_i$ と次式に示す比例関係にあることを考慮し

$$\frac{\rho_i-\rho_0}{\rho_0}=\frac{n_i-n_0}{n_0}$$

連続式は以下のように表される．

$$\frac{1}{n_0}\left(\frac{Dn}{Dt}\right)^c+\nabla\cdot\delta\boldsymbol{u}^c=0$$

第二段階での速度修正量、第一段階終了時の粒子数密度の定義、連続式より以下のPoisson方程式が得られる．

$$\nabla^2 p^{k+1}_i=-\frac{\rho_0}{(\Delta t)^2}\frac{n^\ast_i-n_0}{n_0}$$

連続式から派生した式\ref{eq_mps_n2u}と合わせると，第一段階で生じる粒子数密度の $n_0$ からの変動 $\left(\frac{Dn}{Dt}\right)^p$ と第二段階での速度修正量 $\delta\boldsymbol{u}^c$ による粒子数密度の変動 $\left(\frac{Dn}{Dt}\right)^c$ が対応するように速度修正量 $\delta\boldsymbol{u}^c$ を与えることで粒子数密度の変動が相殺され体積保存性が保たれる事を意味する．

圧力のPoisson方程式の離散化では左辺の圧力のLaplacian項に対し次式のLaplacianモデルを用いる．

$$\nabla^2 p^{k+1}\_i=\frac{2 D_s}{\lambda n_0}\sum_{j\neq i}(p^{k+1}_j-p^{k+1}\_i)w(|\boldsymbol{r}^\ast\_{ij}|)$$

圧力のPoisson方程式を陰的に解いて圧力 $p^{k+1}_i$ を求める．これは $N$ 個の粒子の場合，以下の $N$ 元連立方程式を解ベクトル $p^{k+1}_i$ について解くことと等しい．

```math
\label{eq_mps_n2p_matrix}
\begin{pmatrix}
-\dfrac{\rho_0}{(\Delta t)^2}\dfrac{n^\ast_1-n_0}{n_0}\\
-\dfrac{\rho_0}{(\Delta t)^2}\dfrac{n^\ast_2-n_0}{n_0}\\
\vdots\\
-\dfrac{\rho_0}{(\Delta t)^2}\dfrac{n^\ast_N-n_0}{n_0}
\end{pmatrix}
=
\begin{pmatrix}
-\dfrac{2 D_s}{\lambda n_0}\sum_{j\neq 1}w(|\boldsymbol{r}^\ast_{1j}|)
&
\dfrac{2 D_s}{\lambda n_0}w(|\boldsymbol{r}^\ast_{12}|)
&\cdots&
\dfrac{2 D_s}{\lambda n_0}w(|\boldsymbol{r}^\ast_{1N}|)
\\
\dfrac{2 D_s}{\lambda n_0}w(|\boldsymbol{r}^\ast_{21}|)
&
-\dfrac{2 D_s}{\lambda n_0}\sum_{j\neq 2}w(|\boldsymbol{r}^\ast_{2j}|)
&\cdots&
\dfrac{2 D_s}{\lambda n_0}w(|\boldsymbol{r}^\ast_{2N}|)
\\
\vdots&\vdots&\ddots&\vdots
\\
\dfrac{2 D_s}{\lambda n_0}w(|\boldsymbol{r}^\ast_{N1}|)
&
\dfrac{2 D_s}{\lambda n_0}w(|\boldsymbol{r}^\ast_{N2}|)
&\cdots&
-\dfrac{2 D_s}{\lambda n_0}\sum_{j\neq N}w(|\boldsymbol{r}^\ast_{Nj}|)
\end{pmatrix}
\begin{pmatrix}
p^{k+1}_1\\
p^{k+1}_2\\\vdots\\
p^{k+1}_N
\end{pmatrix}
```
ここで，上式の係数行列は対称行列となり，また粒子の組み合わせは互いに影響半径外に位置する場合が殆どであるので疎行列でもある．境界条件として自由表面（水面）については粒子の圧力を0とするディリクレ境界条件を与え，壁面については圧力勾配が0となるノイマン境界条件を設定する．本稿では連立方程式の反復解法としてICCG法(不完全コレスキー分解付き共役勾配法)を用いた．

以上の手順により，圧力のPoisson方程式(PPE)から圧力 $p^{k+1}$ が得られ式\ref{eq_mps_p2u}より第二段階における速度ベクトルの修正値 $\delta\boldsymbol{u}^c$ が得られる．最終的に得られた修正速度ベクトル $\delta\boldsymbol{u}^p$ ， $\delta \boldsymbol{u}^c$ を用いて式\ref{eq_mps_update}から粒子の位置と速度が更新され，1ステップの計算が完了する．

### 今後の改修計画

- 誤魔化しのない完全な半陰解法を目指す
- 各種高精度化手法を組み込む
    - CMPS法は実装済み
- Rust+GPGPUで100万個以上の流体粒子を用いた計算を回せるコードにする

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