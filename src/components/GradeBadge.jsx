import { THREAT_GRADES } from '../data/canon.js';
import './GradeBadge.css';

const GRADE_COLOR = {};
THREAT_GRADES.public.forEach((g) => { GRADE_COLOR[g.g] = g.color; });
const RESTRICTED_COLOR = {};
THREAT_GRADES.restricted.forEach((g) => { RESTRICTED_COLOR[g.g] = g.color; });

export function gradeColor(grade) {
  return GRADE_COLOR[grade] || RESTRICTED_COLOR[grade] || '#9a8f7a';
}

export default function GradeBadge({ grade, size = 'md', title }) {
  if (!grade) return null;
  const color = gradeColor(grade);
  const isClass = grade.includes('Class');
  return (
    <span
      className={`grade grade--${size} ${isClass ? 'grade--class' : ''}`}
      style={{ '--g': color }}
      title={title || `Guild Threat Grade: ${grade}`}
    >
      <span className="grade__label">Threat</span>
      <span className="grade__value">{grade}</span>
    </span>
  );
}
