# Library System API

Лабораторна робота «Документування API за допомогою OpenAPI та Zudoku».
Варіант: **Library system** — сутності **Book**, **Author**.

- 📘 Документація (GitHub Pages): https://soft41.github.io/library-api/
- 📄 OpenAPI-документ: [`openapi/library-api.yaml`](openapi/library-api.yaml)
- 📦 SDK (TypeScript, Axios): [`sdk/typescript-axios`](sdk/typescript-axios)

## Структура

| Шлях | Зміст |
| --- | --- |
| `openapi/library-api.yaml` | OpenAPI 3.0.3 специфікація |
| `sdk/typescript-axios/` | SDK-клієнт, згенерований OpenAPI Generator v7.10.0 |
| `docs/` | Zudoku-проєкт документації |

## Ендпоінти

| Метод | Шлях | Опис | Авторизація |
| --- | --- | --- | --- |
| GET | `/authors` | список авторів (пагінація, `country`, `search`) | — |
| POST | `/authors` | створити автора | Bearer JWT |
| GET | `/authors/{authorId}` | автор за ID | — |
| PUT | `/authors/{authorId}` | оновити автора | Bearer JWT |
| DELETE | `/authors/{authorId}` | видалити автора | Bearer JWT |
| GET | `/authors/{authorId}/books` | книги автора | — |
| GET | `/books` | список книг (пагінація, `genre`, `authorId`, `available`) | — |
| POST | `/books` | додати книгу | Bearer JWT |
| GET | `/books/{bookId}` | книга за ID | — |
| PUT | `/books/{bookId}` | оновити книгу | Bearer JWT |
| DELETE | `/books/{bookId}` | видалити книгу | Bearer JWT |

## Генерація SDK

```bash
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli:v7.10.0 generate \
  -i /local/openapi/library-api.yaml -g typescript-axios -o /local/sdk/typescript-axios \
  --git-user-id Soft41 --git-repo-id library-api \
  --additional-properties=npmName=library-api-sdk,npmVersion=1.0.0,supportsES6=true,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models
```

## Документація локально та деплой

Потрібен Node.js 24 (на Node 22 збірка Zudoku падає з `ERR_REQUIRE_CYCLE_MODULE`).

```bash
cd docs
npm install
npm run dev      # локальний сервер
npm run deploy   # збірка + публікація dist у гілку gh-pages (scripts/deploy.mjs)
```

GitHub Pages налаштовано на гілку `gh-pages` (root).

## Автор

[Soft41](https://github.com/Soft41)
