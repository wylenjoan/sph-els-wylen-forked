import { formatDistance } from 'date-fns';

function formatRelativeDate(date: string) {
  return `${formatDistance(new Date(date), Date.now())} ago`;
}

export default formatRelativeDate
