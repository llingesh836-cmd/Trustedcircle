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

**Important:** If you're getting 404 errors, Amplify may not be detecting Next.js correctly.

### Recommended Fix:
1. **Delete** your current Amplify app
2. **Create a new Amplify app** and select **Next.js** as the framework
3. Connect to your GitHub repo
4. Amplify will auto-configure the build settings

### Manual Configuration (if recreating doesn't work):
In Amplify Console > App settings > Build settings:
- Build commands: `npm ci` then `npm run build`
- Build output directory: `.next`

The `amplify.yml` in the repo should handle this automatically, but framework selection is crucial.
