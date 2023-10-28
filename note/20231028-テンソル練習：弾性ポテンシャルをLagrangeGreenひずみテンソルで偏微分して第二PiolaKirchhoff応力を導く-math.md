$$\Psi=\frac{\lambda}{2}(\mathrm{tr}\bm{E})^2+\mu\bm{E}:\bm{E}$$

$$\frac{\partial\bm{\Psi}}{\partial\bm{E}}=\bm{S}=\lambda\bm{I}\mathrm{tr}E+2\mu\bm{E}$$

となるはず。テンソルで示す

$$\frac{\partial\bm{\Psi}}{\partial\bm{E_{ij}}}=\lambda\mathrm{tr}\bm{E} \frac{\partial\mathrm{tr}\bm{E}}{\partial E_{ij}}+\mu\frac{\partial\bm{E}:\bm{E}}{\partial E_{ij}}$$

右の二つの偏微分を整理する

$$\frac{\partial\mathrm{tr}\bm{E}}{\partial E_{ij}}=\frac{\partial E_{kk}}{\partial E_{ij}}=\delta_{ik}\delta_{kj}=\delta_{ij}$$

$$\frac{\partial\bm{E}:\bm{E}}{\partial E_{ij}}=\frac{\partial E_{kl}E_{kl}}{\partial E_{ij}}=2 E_{kl}\frac{\partial E_{kl}}{\partial E_{ij}}=2 E_{kl}\delta_{ik}\delta_{jl}=2E_{ij}$$

代入して

$$\frac{\partial\bm{\Psi}}{\partial\bm{E_{ij}}}=\lambda\mathrm{tr}\bm{E} \delta_{ij}+2\mu E_{ij}=\lambda\bm{I}\mathrm{tr}E+2\mu\bm{E}=\bm{S}$$

すっきり

```math
\frac{\partial E_{kk}}{\partial E_{ij}}=\delta_{ik}\delta_{kj}
\qquad
\frac{\partial E_{kl}E_{kl}}{\partial E_{ij}}=2 E_{kl}\frac{\partial E_{kl}}{\partial E_{ij}}
```

こういうのは機械的に$ik$,$jk$が一致するとき1になり、そうでないとき0になることを先に考え、$k$や$kl$による縮約は偏微分の後から解釈するのがコツ

第一PiolaKirchhoff応力は現在配置座標系-基準配置座標系間を跨り定義されるので対称テンソルにならないのに対し
第二PiolaKirchhoff応力は基準配置の座標系で定義されるので対称テンソルとなる

粒子法p167より