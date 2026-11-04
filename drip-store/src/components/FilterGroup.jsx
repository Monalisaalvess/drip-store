import "./FilterGroup.css"

// title: título do grupo | inputType: "checkbox" ou "radio"
// options: [{ text, value? }] | name: nome do campo | selected: valores marcados
// onChange(value, checked): avisa a página quando o usuário marca/desmarca
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
