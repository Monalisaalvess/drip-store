import "./components-CSS/FilterGroup.css"

function FilterGroup({ title, inputType = "checkbox", options = [], name, selected = [], onChange }) {
  const groupName = name ?? title
  return (
    <fieldset className="filter-group">
      <legend className="filter-group__title">{title}</legend>
      {options.map((option) => {
        const value = option.value ?? option.text
        return (
          <label className="filter-group__option" key={value}>
            <input
              type={inputType}
              name={groupName}
              value={value}
              checked={selected.includes(value)}
              onChange={(e) => onChange?.(value, e.target.checked)}
            />
            <span>{option.text}</span>
          </label>
        )
      })}
    </fieldset>
  )
}

export default FilterGroup
