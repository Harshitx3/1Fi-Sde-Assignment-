export default function SearchBar({ placeholder = 'Search online stores...' }) {
  return (
    <div className="search-bar">
      <svg
        className="search-bar-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        aria-label="Search stores"
      />
    </div>
  )
}
