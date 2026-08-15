---
name: sync-site-data
description: "Sync portfolio Writing and OSS data, generate concise English titles for Japanese Zenn articles, update scripts/data/site.json, and rebuild public HTML. Use when refreshing articles, OSS activity, or site data."
argument-hint: "Sync external portfolio data and rebuild HTML"
---

# サイトデータの同期

GitHub Actionsや翻訳APIを使わずに、ポートフォリオの生成データを更新します。

## 手順

1. `scripts/data/site.json`を読み、既存の`englishTitle`を`href`ごとに保持します。
2. Zennの記事一覧を次のAPIから取得し、Writing項目へ変換します。
   - URL: `https://zenn.dev/api/articles?page=1&username=nissy_dev&count=96&order=latest`
   - `title`は`article.title`を使います。
   - `href`は`article.path`を`https://zenn.dev`からの絶対URLへ変換します。
   - `publishedAt`は`article.published_at`を使います。
   - URLが一致する既存項目の`englishTitle`を引き継ぎます。
3. Cybozu Inside Outの検索結果を`https://blog.cybozu.io/search?q=nissy_dev`から取得し、本人が執筆または共同執筆した記事をWriting項目へ変換します。
   - 検索語が本文中のリンクや登壇者一覧に出現するだけの記事は除外します。
   - 記事タイトル、記事URL、公開日を取得します。
   - URLが一致する既存項目の`englishTitle`を引き継ぎます。
4. 過去2年間のOSS活動をGitHubから取得し、OSS項目へ変換します。
   - マージ済みPR: `author:nissy-dev is:pr is:merged created:>=YYYY-MM-DD`
   - Issue: `author:nissy-dev is:issue created:>=YYYY-MM-DD`
   - `YYYY-MM-DD`には実行日時の2年前の日付をUTCで指定します。
   - 各検索は最大100件取得します。
   - `nissy-dev/`で始まるリポジトリを除外します。
   - 各項目に`kind`、`repo`、`title`、`href`、`createdAt`を設定します。
   - `kind`はPRなら`PR`、Issueなら`Issue`とします。
5. 新しいWriting項目の英題を、次のルールで生成します。
   - 日本語の`title`を、簡潔で自然な技術英語へ翻訳します。
   - title caseではなくsentence caseを使います。先頭の単語と、固有名詞、製品名、API名、略語だけを大文字にします。
   - 製品名、API名、大文字小文字、バージョン番号を維持します。
   - タイトルだけを翻訳し、要約や原文にない主張を追加しません。
   - 翻訳結果を対象項目の`englishTitle`へ書き込みます。
6. 日本語タイトルが変わった場合やユーザーが依頼した場合を除き、空でない`englishTitle`を書き換えません。
7. 新しいWritingとOSSを`scripts/data/site.json`へ直接書き込みます。
8. WritingとOSSを日時の新しい順に並べ、同じ一覧内の重複する`href`を除外します。
9. すべてのWriting項目に、空でない`title`、`englishTitle`、`href`、`publishedAt`があることを検証します。
10. `npm run build`を実行します。
11. 次の点を確認します。

- WritingとOSSの項目が新しい順に並んでいること。
- 各一覧内に重複する`href`がないこと。
- `public/writing.html`と`public/oss.html`が再生成されていること。
- `git diff --check`が成功すること。

## データの管理範囲

- `scripts/data/site.json`: エージェントが直接更新する唯一のデータファイル。Writingの英題とOSS活動を含みます。
- `scripts/templates/*.html`: 固定のページテンプレート。
- `public/*.html`: デプロイ用の生成物。一覧項目を直接編集しません。

## Writingの表示

日本語タイトルは元記事へリンクします。英題は、元記事のURLと英語を対象言語に指定したGoogle翻訳へリンクします。
