# Authorization

API використовує схему безпеки **BearerAuth** — HTTP Bearer-автентифікацію з **JWT**-токеном
(`components.securitySchemes.BearerAuth` в OpenAPI-документі).

```http
Authorization: Bearer <token>
```

## Які запити потребують токена

| Операція | Методи | Авторизація |
| --- | --- | --- |
| Читання авторів і книг | `GET /authors`, `GET /authors/{authorId}`, `GET /authors/{authorId}/books`, `GET /books`, `GET /books/{bookId}` | не потрібна |
| Створення | `POST /authors`, `POST /books` | **потрібна** |
| Оновлення | `PUT /authors/{authorId}`, `PUT /books/{bookId}` | **потрібна** |
| Видалення | `DELETE /authors/{authorId}`, `DELETE /books/{bookId}` | **потрібна** |

Якщо токен відсутній або недійсний, сервер повертає `401 Unauthorized`:

```json
{
  "code": 401,
  "message": "Потрібна авторизація"
}
```

## Приклад запиту (curl)

```bash
curl -X POST https://api.library.example.com/v1/books \
  -H "Authorization: Bearer $LIBRARY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Лісова пісня","isbn":"978-966-10-1234-5","authorId":2,"genre":"drama"}'
```

## Авторизація в SDK

У згенерованому TypeScript SDK токен передається через `Configuration.accessToken` —
SDK сам додає заголовок `Authorization: Bearer ...` до захищених запитів.

```ts
import { Configuration, BooksApi } from "library-api-sdk";

const config = new Configuration({
  basePath: "https://api.library.example.com/v1",
  accessToken: process.env.LIBRARY_TOKEN,
});

const books = new BooksApi(config);

const { data: created } = await books.createBook({
  title: "Лісова пісня",
  isbn: "978-966-10-1234-5",
  authorId: 2,
  genre: "drama",
});
console.log(created.id);
```

## Спробувати в документації

На сторінці [API Reference](/api) у вікні «Test request» можна вказати токен
у заголовку `Authorization` та виконати запит прямо з браузера.
