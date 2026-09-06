const navItems = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <svg
        className="bottom-nav-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: (
      <svg
        className="bottom-nav-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },

]

export default function BottomNav({ active = 'shop' }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`bottom-nav-item ${active === item.id ? 'active' : ''}`}
          aria-current={active === item.id ? 'page' : undefined}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
