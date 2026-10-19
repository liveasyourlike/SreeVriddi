# Sree Vriddhi Virtual Agreement System — Preview Specification

Status: Preview-only design prototype. No investment collection, customer submission, payment, live agreement generation, or e-signing is enabled.

## Decisions
- Implementation: service-backed web module (integration phase not connected).
- Signature: e-signature provider integration, subject to provider and legal review.
- Languages: English and Telugu. Every approved template must be reviewed by a qualified bilingual legal reviewer.
- Agreement creation access: admin only.
- Existing intake source: the Sree Vriddhi 10-Point Preliminary Evaluation Google Form. Do not assume a submission is verified simply because it arrived from Google Forms.
- Website contact details: sreevriddhiforwealth@gmail.com, +91 9640352929, https://wa.me/919640352929.
- CRM and email verification remain a later phase.

## Workflow
1. Evaluation received: store only the submission reference and required metadata; do not duplicate sensitive fields without a documented need.
2. Admin verification: validate identity and completeness using an approved process; mark missing or inconsistent data for follow-up.
3. Risk and valuation review: record asset description, valuation method, valuation date, assumptions, evidence and reviewer; do not promise acceptance or returns.
4. Agreement draft: generate from a versioned, approved template. All financial values and dates must come from verified, explicitly approved inputs. Never infer rates, returns or guarantees.
5. Legal approval: require a named reviewer, template version, language pair and approval timestamp.
6. Issuance: create a one-time, expiring signing session with the selected e-sign provider. The signing service must verify signer identity according to its approved method.
7. Completion: verify the provider's webhook signature server-side, store the provider transaction ID and signed artifact hash, then archive the final document.
8. Amendments/termination: issue a new version; never overwrite a signed artifact. Keep the prior version and reason for change.

## Data model
- Applicant: id, intake_source, intake_reference, full_name, phone, email, address, identity_verification_status, consent_timestamp.
- Application: id, applicant_id, asset_category, asset_description, received_at, status, assigned_admin_id.
- Valuation: id, application_id, method, estimated_value, currency, evidence_refs, assumptions, reviewed_by, reviewed_at.
- Agreement: id, application_id, template_id, template_version, language_pair, status, created_by, created_at, legal_approved_by, legal_approved_at, terms_snapshot_hash.
- AgreementParty: id, agreement_id, party_role, verified_identity_ref, signer_status.
- SignatureEnvelope: id, agreement_id, provider, provider_envelope_id, status, sent_at, completed_at, signed_artifact_hash.
- Document: id, application_id, storage_key, content_type, checksum, uploaded_by, scanned_at, retention_until.
- AuditEvent: id, actor_id, actor_role, action, resource_type, resource_id, timestamp, request_id, outcome, metadata_redacted, previous_event_hash.
- ConsentRecord: id, applicant_id, notice_version, purpose, language, consented_at, withdrawal_at.
- Template: id, template_name, version, language, status, approved_by, approved_at.

Bank, PAN and UPI details are high-sensitivity fields. Store only if necessary, encrypt at rest and in transit, mask by default, tightly limit access, and never write full values into application logs or audit metadata.

## Security requirements
- Use real server-side authentication and authorization. Hiding a button or checking a role in React is not a security boundary.
- Admin role must be provisioned by an owner/admin; no public sign-up or shared demo credentials.
- Enforce least-privilege authorization on every API route and every record access.
- Use secure, HTTP-only, SameSite cookies or a vetted identity provider; protect state-changing requests against CSRF.
- Validate all input on the server; rate-limit login and signing actions; use MFA for admins.
- Use a private object-storage bucket for documents, malware scanning, short-lived signed download URLs, encryption, backups and a documented retention/deletion policy.
- Keep secrets only in server-side environment variables; never expose provider secrets in Vite/client bundles.
- Make audit records append-only and server-generated. Log actor, timestamp, action, target, outcome and request ID; redact PAN, bank account, UPI, access tokens and document contents.
- Verify e-sign provider webhooks cryptographically and make handlers idempotent.
- Provide access, correction, withdrawal and deletion processes as applicable under the privacy notice and relevant law.
- Keep Preview data synthetic. Do not use real PANs, bank details, signatures or customer documents in test fixtures.

## E-sign integration
The preview only describes the workflow. Before enabling signing, select a provider that supports the required Indian signing method, obtain its credentials server-side, review KYC/signing requirements, verify provider callbacks, and confirm document integrity, timestamp and evidence export. Do not claim an electronic signature is legally sufficient for every document type without legal review.

## Legal-review checklist
- Confirm the contracting legal entity, its registration, authority, address, tax status and grievance contact.
- Obtain Indian counsel's review of the proposed business model and all applicable RBI, SEBI, Companies Act, Banning of Unregulated Deposit Schemes Act, state money-lending/deposit and other requirements as relevant. Do not assume a disclaimer alone makes a financial arrangement lawful.
- Approve every financial clause: principal/asset, valuation, rate if lawful, calculation basis, frequency, dates, deductions, taxes, late/default terms, maturity and refund/settlement mechanics.
- Assess whether any solicitation, pooled money, guaranteed return, deposit, security, investment product or intermediary activity requires authorization/registration. Keep such activity disabled until counsel confirms the permitted model.
- Confirm stamp duty, e-stamping and acceptable signature method for the specific agreement and parties.
- Approve English and Telugu versions side-by-side, including which language prevails if wording differs.
- Approve risk disclosures, no-guarantee language, cancellation, complaints, jurisdiction, dispute resolution, privacy notice, consent and data retention.
- Document legal approver, date, approved template version and change history.

## Preview acceptance criteria
- Route is separate from the public evaluation form and existing customer portal.
- No real applicant records are loaded.
- Draft creation and signing controls remain disabled.
- No payment or investment collection endpoints are enabled.
- English/Telugu display switch works.
- All visible status/audit entries are marked as sample.
- Production release requires security tests, legal sign-off, provider integration and explicit approval.
