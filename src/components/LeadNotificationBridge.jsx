import { useEffect, useRef } from 'react';
import { useSreeVriddhi } from '../context/SreeVriddhiContext';

export default function LeadNotificationBridge() {
  const { leads = [] } = useSreeVriddhi();
  const initialized = useRef(false);
  const knownIds = useRef(new Set());

  useEffect(() => {
    if (!initialized.current) {
      leads.forEach(lead => lead?.id && knownIds.current.add(lead.id));
      initialized.current = true;
      return;
    }
    leads.filter(lead => lead?.id && !knownIds.current.has(lead.id)).forEach(lead => {
      knownIds.current.add(lead.id);
      fetch('/api/leads/notify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lead})})
        .then(response => response.json().catch(() => ({})))
        .then(result => { if (!result?.ok) console.warn('Lead notification not fully configured', result); })
        .catch(error => console.error('Lead notification request failed', error));
    });
  }, [leads]);
  return null;
}
