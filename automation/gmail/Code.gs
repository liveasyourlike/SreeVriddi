const CONFIG = {
  MAX_THREADS_PER_RUN: 10,
  PROCESSED_PREFIX: 'processed_message_'
};

function getAiUrl_() {
  const url = PropertiesService.getScriptProperties().getProperty('SREE_VRIDDHI_AI_URL');
  if (!url) throw new Error('Set Script Property SREE_VRIDDHI_AI_URL to the deployed /api/ai/chat URL before enabling the Gmail trigger.');
  return url;
}

function processSreeVriddhiGmail() {
  const threads = GmailApp.search('in:inbox is:unread newer_than:7d', 0, CONFIG.MAX_THREADS_PER_RUN);
  const props = PropertiesService.getScriptProperties();
  threads.forEach(thread => {
    const messages = thread.getMessages();
    const latest = messages[messages.length - 1];
    const messageId = latest.getId();
    if (props.getProperty(CONFIG.PROCESSED_PREFIX + messageId)) return;

    const sender = latest.getFrom();
    const subject = latest.getSubject() || '(No subject)';
    const body = latest.getPlainBody().slice(0, 12000);
    const history = messages.slice(-6).map(m => ({ role: 'user', content: m.getPlainBody().slice(0, 3000) }));

    const result = callAi(body, history, 'gmail');
    const subjectLine = subject.startsWith('Re:') ? subject : 'Re: ' + subject;
    const draftBody = result.answer + '\n\n---\nAI classification: ' + result.intent + '\nRisk: ' + result.risk + '\nConfidence: ' + (result.confidence || 'N/A') + '\n\nPlease review before sending.';
    thread.createDraftReply(draftBody);

    const owner = Session.getEffectiveUser().getEmail();
    GmailApp.sendEmail(owner, '🔔 Sree Vriddhi AI — Approval Required',
      'Customer: ' + sender + '\nIntent: ' + result.intent + '\nRisk: ' + result.risk + '\nConfidence: ' + (result.confidence || 'N/A') + '\n\nDraft response created in Gmail. Open Gmail → Drafts → Review → Send.\n\nSubject: ' + subjectLine);

    props.setProperty(CONFIG.PROCESSED_PREFIX + messageId, new Date().toISOString());
    latest.markRead();
  });
}

function callAi(message, history, channel) {
  const response = UrlFetchApp.fetch(getAiUrl_(), {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    payload: JSON.stringify({ message: message, history: history, channel: channel })
  });
  const code = response.getResponseCode();
  if (code < 200 || code >= 300) throw new Error('AI endpoint returned HTTP ' + code + ': ' + response.getContentText());
  return JSON.parse(response.getContentText());
}

function installFiveMinuteTrigger() {
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'processSreeVriddhiGmail') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('processSreeVriddhiGmail').timeBased().everyMinutes(5).create();
}

function testWithSampleEmail() {
  const result = callAi('Hello, what services does Sree Vriddhi provide and what sectors are listed for allocation?', [], 'gmail-test');
  Logger.log(JSON.stringify(result));
}
