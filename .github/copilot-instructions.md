# Trusted Circle — AI Development Guide

**Project Type:** Next.js 14 MVP | E-commerce gift vouchers  
**Stack:** React 18 + TypeScript + Tailwind CSS + Next.js API Routes  
**Deployment:** AWS Amplify (Next.js framework, `.next` output)

---

## Quick Start

```bash
npm install
npm run dev      # Local development on http://localhost:3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # TypeScript & linting
```

---

## Architecture Overview

### App Structure
- **App Router** (Next.js 14+): All pages, routes, and API handlers under `app/`
- **Client Pages:** `app/auth/`, `app/login/`, `app/register/`, `app/profile/`, `app/voucher/[id]/`, `app/processing/`
- **API Routes:** `app/api/auth/`, `app/api/orders/`, `app/api/payment/`, `app/api/vouchers/`
- **Components:** Reusable UI in `components/` (Navbar, CartSidebar, VoucherCard, etc.)
- **State Management:** React Context + localStorage (CartContext)
- **Mock Data:** `lib/mockData.ts` — seed data ready for database integration

### Key Concepts

#### 1. **Client vs Server Components**
- Pages and components that manage state, hooks, or interactivity use `'use client'`
- API routes are server-only
- Root layout (`app/layout.tsx`) wraps app with `CartProvider` for global cart state

#### 2. **Data Flow**
```
UI (pages/components) → CartContext/localStorage → API routes → mock data (mockData.ts)
```
- Mock data contains all business logic: user auth, voucher catalog, orders, codes
- To migrate to real DB: Replace mockData.ts calls with database queries

#### 3. **Cart & Session Management**
- **Cart:** Stored in React Context + synchronized to localStorage
- **User Session:** Tracked via localStorage or request body (phone number principal)
- **Orders:** Created in-memory, retrieved by user's phone or order ID

---

## File Reference & Conventions

### Core Files
| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with CartProvider, metadata |
| `context/CartContext.tsx` | Global cart state (add/remove/update items, total) |
| `lib/mockData.ts` | All mock data: vouchers, users, orders, auth logic |
| `components/Navbar.tsx` | Navigation with cart icon & user menu |
| `public/assets/vouchers/` | Voucher brand images |

### API Routes Pattern
All API routes follow this pattern:
```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate input
    // Call mock data / business logic
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
```

**Key Routes:**
- `POST /api/auth/login` — Authenticate user (email + password or phone + OTP)
- `POST /api/auth/send-otp` — Send OTP (mocked, always 123456)
- `POST /api/auth/verify-otp` — Verify OTP
- `POST /api/orders/create` — Create order from cart
- `POST /api/payment/verify` — Mock payment flow
- `GET /api/vouchers` — List all vouchers
- `GET /api/orders/[id]` — Get order details

---

## Development Conventions

### TypeScript Strictness
- Strict mode enabled (`tsconfig.json`)
- No implicit `any` types
- All API responses should have clear type definitions
- Use discriminated unions for state (e.g., `OrderStatus = 'created' | 'paid' | 'completed'`)

### Component Patterns
- **Page components** (`app/*/page.tsx`): Server components by default, wrap with `'use client'` if needed
- **Reusable components** (`components/*.tsx`): Always use `'use client'` if they use hooks or state
- **Styling:** Tailwind utility classes; no CSS files except `globals.css`

### Form Handling
- Use native browser `<form>` elements with `onSubmit`
- Call API routes via `fetch()`
- Example:
  ```typescript
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
  };
  ```

### State & Context
- **Cart items** and order state belong in CartContext
- **Temporary UI state** (form inputs, loading) in component `useState`
- **User session:** Track phone in URL params or context for now

### Linting
Run `npm run lint` before commits. No intentional eslint-disable comments.

---

## Common Development Tasks

### Adding a New Page
1. Create `app/new-page/page.tsx` (server component)
2. Add `'use client'` if it needs interactivity
3. Add to Navbar navigation if user-facing
4. Style with Tailwind

### Adding a New API Endpoint
1. Create route file at `app/api/feature/route.ts`
2. Export `async function POST/GET/PUT/DELETE(request: Request)`
3. Use `NextResponse.json()` for responses
4. Add business logic to `lib/mockData.ts` (or database when migrated)
5. Update TypeScript types if needed

### Modifying Mock Data
- `lib/mockData.ts` contains all seed data and business logic
- Functions: `authenticateUser()`, `createOrder()`, `getVouchers()`, etc.
- To use a real database: Replace function bodies with DB queries; keep function signatures the same

### Testing an API Route
```bash
# In terminal
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

---

## Key Implementation Details

### Mock Authentication
- **OTP generation:** Always returns `123456` (mocked for MVP)
- **Login:** Email/password validation against mock users in `mockData.ts`
- **Session:** Phone number used as user principal

### Voucher Code Distribution
- Each voucher has codes for amounts: 100, 500, 1000
- `mockData.ts` tracks code inventory by amount
- When order completes, code is assigned from available pool

### Order Processing Flow
1. **Create** (`POST /api/orders/create`): Cart items → Order with status `'created'`
2. **Pay** (`POST /api/payment/verify`): Process payment, status → `'paid'`
3. **Complete** (automatic): Status → `'completed'`, voucher code assigned
4. **Display** (`/processing`): Countdown timer, final code reveal

### localStorage Keys
- `trustedcircle-cart`: Serialized CartContext state
- Add new keys with `trustedcircle-` prefix

---

## Deployment (AWS Amplify)

### Important Notes
1. **Framework selection is critical:** Must select **Next.js** when creating Amplify app
2. **Build settings** (auto-configured if framework correct):
   - Commands: `npm ci` → `npm run build`
   - Output directory: `.next`
3. **If 404 errors occur:**
   - Delete current Amplify app
   - Create new Amplify app (select Next.js)
   - Reconnect GitHub repo

### `amplify.yml` Details
The `amplify.yml` file pre-configures build settings, but Amplify console framework selection overrides it.

---

## Important Notes & Common Pitfalls

⚠️ **Do NOT:**
- Modify component imports without checking CartContext usage
- Add client-side logic to API routes (they're server-only)
- Hardcode user data in components—always pass via props or context
- Mix styled components / CSS-in-JS with Tailwind

✅ **DO:**
- Keep mock data functions pure and testable
- Return explicit error responses from API routes
- Use `localStorage` for non-sensitive session data only
- Test API routes with realistic data payloads

### localStorage Hydration
- Components using localStorage must check `typeof window` before access
- See `CartContext.tsx` for pattern: check in `useEffect` with SSR safety

---

## Types & Interfaces

Key types to understand (from `lib/mockData.ts`):

```typescript
type VoucherAmount = 100 | 500 | 1000;
type OrderStatus = 'created' | 'paid' | 'completed';

interface Voucher { id, brand, discount, description, image, codes }
interface User { phone, name, email, password, emailConfirmed }
interface Order { id, voucherId, voucherName, amount, quantity, status, userPhone, userName, userEmail, voucherCode, createdAt }
interface CartItem { voucherId, voucherName, amount, quantity, price, discount }
```

---

## Next Steps for AI Agents

When implementing features:
1. **Understand the user request** — Read issue/PR description carefully
2. **Identify scope** — Which layer? (UI, API, mock data, all?)
3. **Check mockData.ts** — Add/modify business logic there first
4. **Implement API route** — If needed
5. **Build UI** — Match existing patterns (Tailwind, context, `'use client'`)
6. **Test locally** — `npm run dev` and verify feature end-to-end
7. **Check linting** — `npm run lint` must pass
8. **Reference types** — Ensure `.ts`/`.tsx` files maintain strict TypeScript

---

## Project Health Indicators

- ✅ All routes respond with proper status codes
- ✅ Cart persists across refreshes
- ✅ API errors are descriptive
- ✅ Components are reusable and DRY
- ✅ Tailwind configuration complete (no custom CSS needed)
- ✅ TypeScript strict mode enabled
- ⏳ Database integration pending (use mockData cleanup for easy migration)

---

## Documentation Links

- [Next.js App Router](https://nextjs.org/docs/app)
- [React Context API](https://react.dev/reference/react/useContext)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [AWS Amplify Deployment](https://docs.amplify.aws/nextjs)
