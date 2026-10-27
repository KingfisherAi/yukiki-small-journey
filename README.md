# yukiki-small-journey

はらいどゆきき 入口ページ（小さな旅）。静的ページで、外部への通信は行わない。

## 構成

| パス | 内容 |
|------|------|
| `public/` | Cloudflare Pages の配信ルート（`index.html` / `style.css` / `app.js` / `journey.js` / `assets/countryside.jpg` / `_headers` / `robots.txt`） |
| `tools/` | 配信しないもの（`check.cjs` 回答パターン検証、`package.cjs` 単一HTML化、`image-prompt.txt` 画像生成プロンプト） |

## Cloudflare Pages の設定

- Production branch: `main`
- Build command: なし（空欄）
- Build output directory: `public`

## 更新手順

1. ブランチを切って `public/` 内を編集する
2. `node tools/check.cjs` で回答パターン（64通り）を検証する
3. PR を作ってマージする
4. `main` への push を検知して Cloudflare Pages が自動で配信する（ビルド工程なし）

## ローカル確認

```
cd public
python -m http.server 8000
```

`http://localhost:8000/` を開く。`_headers`（CSP など）は Cloudflare 上でのみ効く。

## 注意

- 元画像（`*.png`）は `.gitignore` で除外している。配信用は `assets/countryside.jpg`（1200×800）のみ
- CSP は `script-src 'self'; style-src 'self'` で、インライン script / style は使えない
- `tools/package.cjs` は旧構成（png・ルート直下配置）前提のため、そのままでは動かない
