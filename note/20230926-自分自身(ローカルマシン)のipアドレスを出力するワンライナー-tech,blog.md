これ

`ip route get 1 | grep -Po '(?<=src\s)[0-9\.]*'`
```
$ ip route get 1 | grep -Po '(?<=src\s)[0-9\.]*'
172.27.44.129
```

## 解説

`ip route get 1`

1は1.0.0.0の省略、`ip`コマンドで1.0.0.0へのルーティングを示します
```
$ ip route get 1
1.0.0.0 via 172.27.32.1 dev eth0 src 172.27.44.129 uid 1000 
    cache
```

`grep -Po '(?<=src\s)[0-9\.]*'`

`src *.*.*.*`はパケットの送信元IPアドレスを意味します。
そこでgrepの正規表現でsrcの次のアドレスを抽出します

-o オプション　マッチした箇所のみを表示
-P オプション　perlの正規表現を使用(前方先読みに必要)

```
$echo "1.0.0.0 via 172.27.32.1 dev eth0 src 172.27.44.129 uid 1000" | grep -Po '(?<=src\s)[0-9\.]*'
172.27.44.129
```

## 参考

https://stackoverflow.com/questions/13322485/how-to-get-the-primary-ip-address-of-the-local-machine-on-linux-and-os-x

参考記事の方法では`uid 1000`部分に騙されて正しく動作しないので修正した
