import { useMemo } from 'react'

export default function VariantSelector({ variants, selectedIndex = 0, onChange }) {
  const attributeGroups = useMemo(() => {
    if (!variants || variants.length === 0) return []
    const internalKeys = new Set([
      'id',
      'price',
      'image',
      'gallery',
      'emiPlans',
      'colorHex',
    ])
    const keys = new Set()
    variants.forEach((v) => {
      Object.keys(v).forEach((k) => {
        const value = v[k]
        if (internalKeys.has(k)) return
        if (typeof value === 'object' && value !== null) return
        if (Array.isArray(value)) return
        keys.add(k)
      })
    })

    const groups = []
    keys.forEach((attrKey) => {
      const labelMap = {
        color: 'Color',
        storage: 'Storage',
        size: 'Screen Size',
        capacity: 'Capacity',
      }
      const uniqueValues = [...new Set(variants.map((v) => v[attrKey]))].filter(Boolean)
      if (uniqueValues.length > 0) {
        groups.push({
          key: attrKey,
          label: labelMap[attrKey] || attrKey.charAt(0).toUpperCase() + attrKey.slice(1),
          options: uniqueValues,
        })
      }
    })
    return groups
  }, [variants])

  const selectedVariant = variants?.[selectedIndex] || variants?.[0] || null

  const handleSelect = (attrKey, value) => {
    if (!selectedVariant) return

    const matchIndex = variants.findIndex((v) => {
      return attributeGroups.every((grp) => {
        if (grp.key === attrKey) return v[grp.key] === value
        return v[grp.key] === selectedVariant[grp.key]
      })
    })

    const fallbackIndex = variants.findIndex((v) => v[attrKey] === value)
    const newIndex = matchIndex !== -1 ? matchIndex : fallbackIndex

    if (newIndex !== -1 && newIndex !== selectedIndex) {
      onChange(newIndex)
    }
  }

  if (!attributeGroups || attributeGroups.length === 0) return null

  return (
    <div className="variant-selector">
      {attributeGroups.map((group) => (
        <div key={group.key} className="variant-group">
          <div className="variant-group-header">
            <span className="variant-group-label">{group.label}</span>
            {selectedVariant && selectedVariant[group.key] && (
              <span className="variant-group-selected">
                Selected: {selectedVariant[group.key]}
              </span>
            )}
          </div>
          <div className="variant-options">
            {group.options.map((option) => {
              const isSelected = selectedVariant && selectedVariant[group.key] === option
              const optionKey = `${group.key}-${String(option)}`
              return (
                <button
                  key={optionKey}
                  type="button"
                  className={`variant-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(group.key, option)}
                  aria-pressed={isSelected}
                >
                  {String(option)}
                  {isSelected && (
                    <svg
                      className="variant-option-check"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
