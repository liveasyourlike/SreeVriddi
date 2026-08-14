# Mobile OTP gate for the 10-Point Preliminary Evaluation

The public `/eligibility` route now opens the mobile OTP gate. A successful OTP verification redirects the customer to `/eligibility/evaluation`, which renders the existing **10-Point Preliminary Evaluation Form**.

## Vercel environment variables

Add these to Preview and Production as appropriate:

- `FAST2SMS_API_KEY` — Fast2SMS API authorization key.
- `FAST2SMS_OTP_ID` — Fast2SMS OTP template ID from the OTP/Smart OTP setup.

The website intentionally does not contain either secret.

## Flow

1. Customer opens `/eligibility`.
2. Customer enters a 10-digit Indian mobile number.
3. Customer clicks **Send OTP**.
4. Resend is disabled for **55 seconds**.
5. Customer enters the received OTP.
6. The server verifies the OTP with Fast2SMS.
7. On successful verification, the browser stores the verified mobile for the evaluation session and routes to `/eligibility/evaluation`.
8. Direct access to `/eligibility/evaluation` without the verification session redirects back to `/eligibility`.

Fast2SMS performs the actual OTP generation and verification; the application does not store the OTP itself.
