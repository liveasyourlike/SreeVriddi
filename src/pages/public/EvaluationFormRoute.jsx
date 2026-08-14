import { Navigate } from 'react-router-dom';
import EligibilityChecker from './EligibilityChecker';

export default function EvaluationFormRoute() {
  const verifiedMobile = typeof window !== 'undefined' ? sessionStorage.getItem('sreeVriddhiEvaluationMobile') : null;
  if (!verifiedMobile) return <Navigate to="/eligibility" replace />;
  return <EligibilityChecker />;
}
