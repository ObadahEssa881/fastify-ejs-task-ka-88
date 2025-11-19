## A simple multilanguage authentication system built using:

Fastify

Prisma

JWT

Fastify Session

EJS Views

TypeScript

Clean Middleware Structure

This is a small assignment-style project that demonstrates session-based + JWT authentication with protected routes and multi-language UI.

## Features

✔ User Signup

✔ User Login

✔ JWT generation & validation

✔ Session storage (user + JWT)

✔ Protected routes (ensureAuth)

✔ Language switching (Arabic & English)

✔ EJS templating

✔ Logout + session destroy

✔ Clean routing structure

✔ Basic UI with improved CSS

## 🔧 Environment Variables

Create a .env file:
```
DATABASE_URL="mysql://root:password@localhost:3306/jobkasroad"
JWT_SECRET="your-secret"
DEFAULT_LANG="en"
SESSION_SECRET="some-random-secret"
```
▶ Running the project
```
npm install
npx prisma migrate dev
npm run dev
```

Open:
```
http://localhost:3000
```
## 📍 Routes Overview

The project supports Arabic and English using a dynamic /:lang prefix.
All pages and actions follow the pattern:
```
/:lang/<page>
```

Where :lang can be:

1- en

2- ar

## Public Routes
Route	Method	Description
```
/:lang	GET	Home page (localized)
/:lang/login	GET	Login page
/:lang/signup	GET	Signup page
/:lang/auth/login	POST	Handles login form
/:lang/auth/signup	POST	Handles signup form
```
Private (Authenticated) Routes

These routes require a valid session or JWT and use the ensureAuth middleware.

Route	Method	Protected	Description
```
/:lang/dashboard	GET	✔ Yes	User dashboard
/:lang/profile	GET	✔ Yes	Profile page (shows session user info)
/:lang/auth/logout	GET	✔ Yes	Destroys session & logs out user
```
