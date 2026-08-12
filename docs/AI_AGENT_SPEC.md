# Sree Vriddhi AI Agent — Step 2

This implementation follows the requested four-phase sequence. The goal is one AI brain shared by Gmail and the website, with WhatsApp reserved for a later official-channel integration.

## Phase 1 — Foundation / Gmail AI
- Google Apps Script Gmail trigger
- Read incoming email and thread context
- Send message to the shared `/api/ai/chat` engine
- Classify intent and risk
- Generate a response draft
- Create Gmail draft
- Notify the owner
- Duplicate-message protection

**Approval gate:** keep the trigger disabled until the Vercel preview endpoint is tested with sample emails.

## Phase 2 — Knowledge
Knowledge is versioned in `knowledge/`:
- `company.json`
- `products.json`
- `faq.json`
- `policies.json`
- `safety.json`

The public knowledge includes the current allocation sectors: Daily Finance, Physical Gold, Fixed Deposits, Housing Rentals, Vehicle Rentals, Oil & Gas Purchase, Retail Businesses (Street Foods, Saree Stalls, Fruits & Juice Centers, Kirana Stores), EV and Automobile Workshops, Staff Recruitment Agency, and Virtual Stocks.

The AI must not invent allocation amounts, percentages, returns, valuations, availability, live market values or customer data.

## Phase 3 — Human approval / safety
Every request receives an intent and risk classification.

- **LOW:** public factual information; can be auto-answered only after testing.
- **MEDIUM:** draft/review workflow while validation is ongoing.
- **HIGH:** human approval mandatory for financial, investment, return, legal, tax or sensitive contractual questions.
- **CRITICAL:** direct human/compliance handling for disputes, grievances, private records, urgent matters or suspected fraud.

The AI must never turn indicative/proposed commercial figures into guaranteed promises.

## Phase 4 — Website AI
The website ChatWidget now uses the same `/api/ai/chat` engine and supports:
- Text questions
- Conversation history
- Voice input when the browser supports Web Speech Recognition
- Risk-aware human handoff messaging
- WhatsApp human-support link
- Mobile-friendly chat UI

### Environment variables
Set in Vercel for Preview and Production as appropriate:
- `OPENAI_API_KEY` — secret; never commit it
- `OPENAI_MODEL` — optional; defaults to `gpt-4o-mini`
- `AI_ALLOWED_ORIGIN` — optional; restrict the API to the website origin

### Gmail setup
Create a Google Apps Script project from `automation/gmail/Code.gs` and `automation/gmail/appsscript.json`.
Add Script Property:
`SREE_VRIDDHI_AI_URL=https://<your-vercel-preview-domain>/api/ai/chat`

Run `testWithSampleEmail()` manually first. After successful tests, run `installFiveMinuteTrigger()`.

### Test gate
Do not treat this branch as production-ready until the following are verified in the Vercel preview:
1. Website AI answers a public FAQ correctly.
2. Website AI identifies the allocation sectors correctly.
3. A returns/profit question is marked HIGH and does not become a guarantee.
4. A complaint/contract/payment dispute is marked CRITICAL and requests human handling.
5. Unknown information is not fabricated.
6. Voice input populates the message box where supported.
7. Gmail sample test creates a draft and owner notification.
8. Duplicate email processing is suppressed.
9. Mobile chat remains usable.

WhatsApp automation is intentionally not activated in this phase; it should use the same brain after the official WhatsApp Business API path is configured and tested.
