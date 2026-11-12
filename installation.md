# Installation

Для роботи з **Library System API** згенеровано клієнтський SDK на **TypeScript (Axios)**
за допомогою [OpenAPI Generator](https://openapi-generator.tech/) (генератор `typescript-axios`).

Вихідний код SDK і OpenAPI-документ лежать у репозиторії
[Soft41/library-api](https://github.com/Soft41/library-api):

| Шлях | Зміст |
| --- | --- |
| `openapi/library-api.yaml` | OpenAPI 3.0 специфікація |
| `sdk/typescript-axios/` | згенерований SDK-клієнт |
| `docs/` | цей сайт документації (Zudoku) |

## Вимоги

- Node.js 18 або новіший
- npm

## Встановлення SDK

```bash
git clone https://github.com/Soft41/library-api.git
cd library-api/sdk/typescript-axios
npm install
npm run build
```

Після збірки підключіть SDK до свого проєкту як локальну залежність:

```bash
cd /path/to/your-project
npm install /path/to/library-api/sdk/typescript-axios
```

## Перший запит

```ts
import { Configuration, BooksApi, AuthorsApi } from "library-api-sdk";

const config = new Configuration({
  basePath: "https://api.library.example.com/v1",
});

const books = new BooksApi(config);
const authors = new AuthorsApi(config);

// GET /books?genre=novel — не потребує авторизації
const { data: bookList } = await books.listBooks(1, 20, "novel");
console.log(bookList.data);

// GET /authors/1
const { data: author } = await authors.getAuthor(1);
console.log(author.firstName, author.lastName);
```

## Сервери

| URL | Призначення |
| --- | --- |
| `https://api.library.example.com/v1` | Production |
| `http://localhost:3000/v1` | Локальний сервер розробки |

## Повторна генерація SDK

Якщо специфікація змінилась, SDK генерується заново (потрібен Docker):

```bash
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli:v7.10.0 generate \
  -i /local/openapi/library-api.yaml \
  -g typescript-axios \
  -o /local/sdk/typescript-axios \
  --git-user-id Soft41 --git-repo-id library-api \
  --additional-properties=npmName=library-api-sdk,npmVersion=1.0.0,supportsES6=true,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models
```
