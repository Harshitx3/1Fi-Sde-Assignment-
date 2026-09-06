export default function SectionHeading({ title, linkText, onLinkClick }) {
  return (
    <div className="section-heading">
      <h2 className="section-heading-title">{title}</h2>
      {linkText && (
        <button
          type="button"
          className="section-heading-link"
          onClick={onLinkClick}
        >
          {linkText}
        </button>
      )}
    </div>
  )
}
