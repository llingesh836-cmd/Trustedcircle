# Trusted Circle

Trusted Circle is a Next.js full-stack MVP for selling discounted branded gift vouchers. It includes:

- Phone OTP authentication (mocked with code `123456`)
- Voucher listing and detail pages
- Order creation and mock payment flow
- Processing page with countdown and voucher generation
- User profile page with order history
- In-memory serverless API routes ready for future database integration

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## AWS Amplify deployment

Add the `amplify.yml` file at the repository root and configure Amplify to use the default branch.
Amplify should run the following commands:

```bash
npm ci
npm run build
```

The artifact directory should be set to `.next`.

If the site still returns `404`, ensure Amplify is configured for Next.js SSR hosting and not plain static hosting.
