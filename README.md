# yukiki-small-journey

はらいどゆきき 入口ページ（はじめての方へ）。静的ページで、外部への通信は行わない。

2026-10-30 に、3問の「小さな旅」形式から、関わり方・参加までの流れ・よくある質問を並べた案内ページに作り替えた。旧版は git 履歴（`bb1a7b2` 以前）から戻せる。

## 構成

| パス | 内容 |
|------|------|
| `public/` | Cloudflare Pages の配信ルート（`index.html` / `en/index.html`（英語版・イギリス英語） / `style.css` / `assets/countryside.jpg` / `photos/` / `_headers` / `robots.txt`） |
| `tools/` | 配信しないもの（`image-prompt.txt` 画像生成プロンプト） |

## Cloudflare Pages の設定

- Production branch: `main`
- Build command: なし（空欄）
- Build output directory: `public`

## 更新手順

1. ブランチを切って `public/` 内を編集する
2. ローカルで表示を確認する（下記）。外部リンク先（ゆききファン・主催者の全体案内）が生きているかも見る
3. PR を作り、Cloudflare Pages のプレビューで確認してからマージする
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
- `photos/` の写真は、まだページから参照していない（活動記録の区画を戻すときに使う）
- 英語版（`public/en/`）は日本語版と同じ `style.css` と画像を使う。日本語版を直したら英語版も合わせて直す
