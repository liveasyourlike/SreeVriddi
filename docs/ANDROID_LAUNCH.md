# Sree Vriddhi PWA + Android launch

## What this release adds

- Installable PWA metadata, home-screen shortcuts and a branded install prompt.
- A conservative service worker: navigation is network-first; API requests are never cached; same-origin static assets can be cached for repeat visits.
- Existing React routes, Vercel API endpoints, backend integrations and customer contact links remain the source of truth.

## 1. Validate the PWA after deployment

1. Open `https://sree-vriddi.vercel.app/` on Android Chrome.
2. Use Chrome's Install app prompt or the in-page install card.
3. Check the app launches in standalone mode and the Investment Sectors, Eligibility, Contact, Privacy, Terms and AI assistant routes work.
4. Test a cold launch, a repeat launch, offline launch (only the shell should be available offline), and then reconnect. Do not represent offline use as full offline functionality.
5. In Chrome DevTools > Application, verify the manifest, service worker and icon requests. Run Lighthouse PWA and accessibility audits.
6. Test iOS Safari's Share > Add to Home Screen flow. iOS uses the manual instruction because it does not expose the same install prompt event.

## 2. Android package route

Use a Trusted Web Activity (TWA) so Android opens the same production website without duplicating its business logic. Keep the website and Vercel APIs as the backend.

Requirements:
- A unique Android application ID approved for the brand.
- Google Play Console developer account and app listing.
- Android Studio / JDK and Bubblewrap CLI on a developer workstation or secured build runner.
- A private Android signing keystore. Never commit it to Git.
- The SHA-256 signing certificate fingerprint for the Play App Signing certificate (and upload key where relevant).

Generate the Android project from the deployed web manifest using Bubblewrap, configure the package ID, app name, theme colours, launcher icon and version, then build a signed Android App Bundle (.aab). Keep the website URL as the launch URL.

## 3. Domain association is mandatory for full-screen TWA

After the final package ID and signing certificate SHA-256 are known, publish this file at:

`https://sree-vriddi.vercel.app/.well-known/assetlinks.json`

Use the exact values supplied by the final Android build / Play Console; do not guess them:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "REPLACE_WITH_FINAL_APPLICATION_ID",
      "sha256_cert_fingerprints": ["REPLACE_WITH_PLAY_APP_SIGNING_SHA256"]
    }
  }
]
```

Do not publish placeholder values. Verify the file returns HTTP 200 with valid JSON and use Google's Digital Asset Links verification before release.

## 4. Google Play release checklist

- Confirm the business/legal entity, privacy policy URL, support contact and data safety disclosures.
- Prepare app name, short/full descriptions, screenshots, feature graphic and app icon using the approved Sree Vriddhi brand assets.
- Complete the Play Console app-content declarations, target API requirements and testing track requirements shown in the current Play Console.
- Upload the signed `.aab` to internal testing first; verify navigation, forms, YouTube playback, AI, external links, accessibility and Android back behaviour on real devices.
- Fix all critical crashes and policy issues; then submit the production release for Google review.
- Google Play publication requires account-owner actions and approval. A GitHub or Vercel deployment alone does not publish an Android app.

## 5. Security and integrity

- Never cache `/api/*`, OTP requests, private data, form submissions or AI responses in the service worker.
- Do not place API secrets, signing keys or Play credentials in frontend files or Git.
- Preserve the official contact details already configured on the website; verify phone, WhatsApp and `sreevriddhiforwealth@gmail.com` before release.
- No investment returns or eligibility outcome should be presented as guaranteed.
