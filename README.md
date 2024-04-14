# store-view

## 概要

ACT Laboratory サイトのソフトウェアライセンス販売ページのフロント


## 環境

React.js

* node: 16.13.0

## site 本体への適用

1. npm run build --production
1. store-viewリポジトリから siteリポジトリへのファイルコピー
  * store-view/build/public/css => site/public/css
  * store-view/build/public/js => site/public/js (js 内の*.mapは除く)
  * store-view/build/index.html => site/app/View/store/indexphtml

