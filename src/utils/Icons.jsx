export function VegIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="#0f8a3c" strokeWidth="1.3" />
      <circle cx="8" cy="8" r="4" fill="#0f8a3c" />
    </svg>
  );
}

export function NonVegIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="#a72b1d" strokeWidth="1.3" />
      <path d="M8 4L12 11H4L8 4Z" fill="#a72b1d" />
    </svg>
  );
}
