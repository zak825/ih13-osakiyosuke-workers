# IH13 OsakiYosuke Workers

Cloudflare PagesからCloudflare WorkersのJSON APIを呼び出す最小構成です。

## ローカル確認

```powershell
Set-Location .\worker
npm install
npm run dev
```

ブラウザで `pages/index.html` を開き、WorkerベースURLに `http://127.0.0.1:8787` を入力します。

## デプロイ

```powershell
Set-Location .\worker
npm run deploy
```

Pagesの公開URLから接続する場合、`worker/src/index.js` は `*.pages.dev` とローカル開発元を許可します。独自ドメインは `wrangler.toml` の `ALLOWED_ORIGINS` に追加してから再デプロイしてください。

利用できるAPIは `/api`、`/api/course`、`/api/hello?name=山田`、`/api/fortune`、`/api/events` です。