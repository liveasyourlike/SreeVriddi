import company from '../../knowledge/company.json' with { type: 'json' };
import products from '../../knowledge/products.json' with { type: 'json' };
import faq from '../../knowledge/faq.json' with { type: 'json' };
import policies from '../../knowledge/policies.json' with { type: 'json' };
import safety from '../../knowledge/safety.json' with { type: 'json' };

export function getKnowledge() {
  return { company, products, faq, policies, safety };
}

export function knowledgeText() {
  return JSON.stringify(getKnowledge());
}
