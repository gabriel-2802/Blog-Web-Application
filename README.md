# Blog Web App

A full-stack blog application with a **Spring Boot** REST API backend and a **React** frontend. Supports role-based access control — **Admin** users can publish, edit, and delete posts, while **Regular** users can browse content and interact through comments.
---

## Features

- **JWT Authentication** — register, login, and receive a signed token (7-day expiry, HS512)
- **Role-Based Access** — `ADMIN` and `USER` roles; admin-only post management enforced via `@PreAuthorize`
- **Blog Posts** — full CRUD with title, content, author, image (Base64), date, and category
- **Categories** — posts are classified as `LOVE_POEMS`, `STATEMENTS`, `QUOTES`, or `POEMS`
- **Comments** — authenticated users can create, edit, and delete their own comments
- **User Profiles** — profile picture (Base64), email, and account management
- **Stateless Sessions** — no server-side session; all auth is token-based
---

## API Reference

### Authentication (`/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ✗ | Register a new user |
| `POST` | `/auth/login` | ✗ | Login and receive a JWT |

### Posts (`/post`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/post/all` | ✗ | Get all posts |
| `GET` | `/post/find/{id}` | ✗ | Get a single post by ID |
| `GET` | `/post/categories` | ✗ | List all available categories |
| `GET` | `/post/category/{category}` | ✗ | Get posts by category |
| `POST` | `/post/create` | ADMIN | Create a new post |
| `PUT` | `/post/update/{id}` | ADMIN | Update a post |
| `DELETE` | `/post/delete/{id}` | ADMIN | Delete a post |

### Comments (`/comment`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/comment/create/{postId}&&{username}` | ✓ | Add a comment to a post |
| `PUT` | `/comment/update/{commentId}` | ✓ | Edit a comment |
| `DELETE` | `/comment/delete/{commentId}` | ✓ | Delete a comment |

### Account (`/account`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/account/info/{username}` | ✓ | Get user profile |
| `POST` | `/account/update/{username}` | ✓ | Update user profile |
| `DELETE` | `/account/delete/{username}` | ✓ | Delete user account |

---

## Frontend Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Browse all posts with sidebar |
| `/post/:postId` | Single Post | View full post with comments |
| `/write` | Write | Create a new post (admin only) |
| `/post/edit/:postId` | Edit Post | Edit an existing post (admin only) |
| `/login` | Login | User login form |
| `/register` | Register | User registration form |
| `/profile` | Profile | View and manage user profile |
| `/*` | 404 | Not found fallback |

---
