export default function BrandCard({ brand }) {
  return (
    <div className="brand-card">
      <div className="brand-card-logo" aria-hidden="true">
        {brand.logoText}
      </div>
      <div className="brand-card-info">
        <h3 className="brand-card-name">{brand.name}</h3>
        <p className="brand-card-desc">{brand.description}</p>
      </div>
      <button type="button" className="brand-card-action">
        {brand.ctaLabel}
      </button>
    </div>
  )
}
