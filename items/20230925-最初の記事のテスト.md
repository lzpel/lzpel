Python: numpyだけで重回帰分析し、t値、p値を求める
卒論で何度も重回帰分析を使うのでスクラッチで関数を書きました．
コピペで使えると思います．

numpyの`np.linalg.lstsq(X, y, rcond=None)`でも重回帰分析を使えますが回帰係数の標準誤差が出てこないのでt値，p値を調べられず痒いところに手が届きません．scikit-learnにも同様の機能は実装されていますが重回帰しか使わないのに重厚長大な機械学習用ライブラリをインストールするのも気が引けます．

- 2022/02/16 p値が正しくなかったので修正

### 実装

```python:main.py
import random
import numpy as np

"""
引数
y: 被説明変数の配列(N)
X: 説明変数の行列(N,K)

返値
coefficient: 回帰係数（K）
r2: 決定係数(重決定) R2
std_error: 回帰係数の標準誤差(K)
t_value: 回帰係数のt値(K)
p_value: 回帰係数のp値(K)

ここに，N: データ数，K: 説明変数の数．

多くの重回帰分析では定数項が必要だと思いますがXに1の列を加えて対応してください
内部的には分散が0の列を定数項の係数とみなし誤差の自由度を1増やしています．
Excelの分析との一致を確認しています．
"""


def numpy_regression(y, X):
    X, y = np.array(X), np.array(y)
    if len(X.shape) != 2:
        raise ValueError("X must be 2-dimention but {}".format(X.shape))
    if len(y.shape) != 1:
        raise ValueError("y must be 1-dimention but {}".format(y.shape))
    if X.shape[0] != y.shape[0]:
        raise ValueError("X and y must have the same number of samples but {} != {}".format(X.shape[0], y.shape[0]))
    if X.shape[0] < X.shape[1]:
        raise ValueError("The number of samples should be larger than the explanatory variables but {} < {}".format(X.shape[0], X.shape[1]))

    # 式参考：http://www.snap-tck.com/room04/c01/stat/stat07/stat0701.html
    coefficient = (np.linalg.inv(X.T @ X) @ X.T) @ y

    # 決定係数
    r2 = 1 - np.sum((y - X @ coefficient) ** 2) / np.sum((y - np.average(y)) ** 2)

    # 回帰係数の標準誤差
    len_variable = sum(X[..., i].var() != 0 for i in range(X.shape[1]))  # 被説明変数の数  # 分散が0の列は観測値ではなく切片の係数1とみなす
    degree_freedom = len(y) - len_variable - 1  # 自由度
    sse = np.sum((y - X @ coefficient) ** 2) / degree_freedom  # sum of squares of residual
    std_error = np.sqrt(np.diagonal(sse * np.linalg.inv(X.T @ X)))

    # t値
    t_value = coefficient / std_error

    # p値
    t_distribution = np.random.standard_t(degree_freedom, size=100000)
    p_value = np.array([float(np.sum(np.abs(t_distribution) > np.abs(t))) for t in t_value])
    p_value /= float(len(t_distribution))

    return coefficient, r2, std_error, t_value, p_value


if __name__ == '__main__':
    random.seed(42, version=2)
    X = [[1, random.random(), random.random(), random.random()] for i in range(10)]  # y切片の係数である1, 説明変数x1, 説明変数x2, 説明変数x3
    y = [x[0] * -0.5 + x[1] * 0.1 + x[2] * 1 + x[3] * 10 + random.random() for x in X]
    # データの表示（csvで保存してexcelで検証できる）
    print("y", "x1", "x2", "x3", sep=",")
    for yi, xi in zip(y, X):
        print(yi, *xi[1:], sep=",")
    print()
    # 解析例
    coefficient, r2, std_error, t_value, p_value = numpy_regression(y, X)
    print("R^2 = ", r2)
    print("descripttion =", ["const", "x1", "x2"])
    print("coefficient =", coefficient.tolist())
    print("std_error =", std_error.tolist())
    print("t-value =", t_value.tolist())
    print("p-value =", p_value.tolist())
```

### 出力

```
y,x1,x2,x3
3.146374892034028,0.6394267984578837,0.025010755222666936,0.27502931836911926
7.755518948901825,0.22321073814882275,0.7364712141640124,0.6766994874229113
4.431603077707306,0.8921795677048454,0.08693883262941615,0.4219218196852704
5.748286341760404,0.029797219438070344,0.21863797480360336,0.5053552881033624
6.57887000265862,0.026535969683863625,0.1988376506866485,0.6498844377795232
6.2196322401333335,0.5449414806032167,0.2204406220406967,0.5892656838759087
8.475038987926917,0.8094304566778266,0.006498759678061017,0.8058192518328079
2.083379206498876,0.6981393949882269,0.3402505165179919,0.15547949981178155
1.721481186445561,0.9572130722067812,0.33659454511262676,0.09274584338014791
6.971778462956479,0.09671637683346401,0.8474943663474598,0.6037260313668911

R^2 =  0.9943144456319659
descripttion = ['const', 'x1', 'x2']
coefficient = [0.2548619678550401, 0.1244280780541554, 0.9428056929246944, 9.867
581856070231]
std_error = [0.3104876509553142, 0.2616106750225857, 0.2954354989090958, 0.35798
34287979412]
t-value = [0.8208441368630155, 0.4756230916166288, 3.1912403770231808, 27.564353
716606952]
p-value = [0.44394, 0.65234, 0.01882, 0.0]
```

### Excelでの重回帰分析と比較

決定係数R2、回帰係数、標準誤差、t値が完全に一致していることが分かります．
![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/118083/deca4dca-d389-da54-88ad-c42936454571.png)

回帰係数，決定係数は定義通り求めています．p値はt値とt分布に従う100000個の変数を用いて愚直に数を数えて求めています．numpyだけではt分布の累積分布関数を表現できないので仕方ない．


良い一日を


