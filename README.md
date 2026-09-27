# 📚 SADEBOOKS — Digital Book Store

## Kile kilichomo
- Modern responsive storefront
- Catalog ya vitabu **200** vya demo, kila kimoja TSh 1,000
- Search: title, author, category, tags
- Categories + sorting + pagination
- Book detail + preview + related books
- Login/Register architecture
- Wishlist
- My Books + purchase history architecture
- `malipo.html?book=BOOK_ID` purchase flow
- Payment-pending boundary ya production
- Admin dashboard + book management UI
- Dark/Light mode (localStorage)
- PWA/service-worker architecture
- Original demo book descriptions, chapters, objectives and SVG covers
- No copyrighted book text is bundled

## Run locally
Because browsers may block `fetch(data/books.json)` when opening HTML directly with `file://`, run a small local server.

### Python
```bash
python -m http.server 8000
```
Then open:
`http://localhost:8000/`

### VS Code
Use Live Server or another static server.

## Deploy
This is suitable for static hosting (GitHub Pages, Netlify, Vercel static, Cloudflare Pages, etc.) for the demo/storefront.

## IMPORTANT: production authentication
The included login/register is **demo-only** and uses localStorage. It is NOT a secure production authentication system.

For production:
- Firebase Auth, Supabase Auth, or your own backend
- Never store passwords in frontend/localStorage
- Server-side authorization for admin routes
- Use secure session cookies/tokens
- Add rate limiting and audit logs

## IMPORTANT: production payments
`malipo.html` intentionally does **not** mark an order as paid.

Recommended production sequence:
1. Frontend requests `POST /api/orders` with book ID.
2. Backend reads the price from its trusted database (do not trust browser price).
3. Backend creates an order and starts a Tanzania-compatible payment gateway.
4. User completes payment.
5. Gateway sends a signed callback/webhook to backend.
6. Backend verifies transaction status, amount, currency and order ID.
7. Backend changes order status to `paid`.
8. Backend creates an entitlement for the user/book.
9. `My Books` requests entitlements from backend.
10. Book file is served through an authorized endpoint or signed URL.

### Never do this
- `?paid=true`
- `localStorage.setItem("paid", "true")`
- Trusting `price=1000` from browser
- Putting payment API secrets in JS
- Exposing admin credentials in HTML/JS

## Suggested backend endpoints
```text
POST /api/auth/register
POST /api/auth/login
POST /api/orders
GET  /api/orders/me
POST /api/payments/initiate
POST /api/payments/webhook
GET  /api/library
GET  /api/books/:id/access
POST /api/admin/books
PATCH /api/admin/books/:id
DELETE /api/admin/books/:id
GET /api/admin/orders
GET /api/admin/payments
GET /api/admin/analytics
```

## Suggested database tables
- users
- books
- categories
- orders
- payments
- entitlements
- wishlists
- audit_logs

## Payment gateway integration
The frontend deliberately uses a generic gateway architecture so you can connect a Tanzania payment provider later without redesigning the bookstore. Keep provider credentials and webhook verification on the server.

## Book licensing
The 200 demo titles, descriptions and SVG covers in this project are original demo material generated for SadeBooks. Replace them with content you own or have licensed before selling.

## Price rule
Default catalog price is **TSh 1,000/=**. In production, keep price authoritative in the backend/database. Admin may change it later, but the browser must never be the source of truth for payment amount.

## Folder structure
```text
SadeBooks/
├── index.html
├── books.html
├── book.html
├── login.html
├── register.html
├── malipo.html
├── payment-pending.html
├── my-books.html
├── wishlist.html
├── profile.html
├── manifest.webmanifest
├── sw.js
├── admin/
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   ├── images/covers/
│   └── books/
├── data/books.json
├── pages/
└── README.md
```
