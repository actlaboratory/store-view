# store-view

## 概要

ACT Laboratory サイトのソフトウェアライセンス販売ページのフロント


## 環境

React.js

* node: 24.x で動作確認しています。

## 開発環境構築

パッケージ管理には pnpm を使用しています。なので、 npm install -g pnpm 等でインストールしてください。

mise.toml があるので、 mise を使っている人は mise install で node のバージョンを自動的に合わせてくれます。

pnpm dev で開発サーバーを起動します。

## ページの表示
npm run dev をすると、 localhost:5173 にサイトが立ち上がります。が、引数なしでアクセスすると、「読み込み中」のまま止まってしまいます。

下準備として、ローカル開発の場合は、 src/settings.js の apiUrl を http://localhost:3000 とします。その後、 site ノバックエンドを docker compose up 等で立ち上げ、通信可能な状態にします。

localhost:3000/?productid=1 のように、 productid を指定してアクセスすると、指定した product の購入ページを表示することができます。この product というのは、バックエンドの products テーブルにある情報を読みに行くために使用するので、 products テーブルにテストデータが存在している必要があります。

## site 本体への適用

1. pnpm build
2. store-viewリポジトリから siteリポジトリへのファイルコピー
