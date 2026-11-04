import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Layout from "./Layout.jsx"
import Section from "../components/Section.jsx"
import ProductListing from "../components/ProductListing.jsx"
import FilterGroup from "../components/FilterGroup.jsx"
import { filterGroups, products } from "../data/products.js"
import "./ProductListingPage.css"

const normalize = (text) =>
  String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

const emptyFilters = { brand: [], category: [], gender: [], state: [] }

function ProductListingPage() {
  const [searchParams] = useSearchParams()
  const term = (searchParams.get("filter") || "").trim()

  const [sort, setSort] = useState("relevance")
  const [filters, setFilters] = useState(emptyFilters)

  function handleFilterChange(group, value, checked) {
    setFilters((current) => {
      if (group.inputType === "radio") return { ...current, [group.key]: [value] }
      const values = checked
        ? [...current[group.key], value]
        : current[group.key].filter((v) => v !== value)
      return { ...current, [group.key]: values }
    })
  }

  const visibleProducts = useMemo(() => {
    const query = normalize(term)
    const result = products.filter((product) => {
      const matchesTerm =
        !query ||
        normalize(`${product.name} ${product.brand} ${product.category}`).includes(query)
      const matchesFilters = filterGroups.every(
        (group) =>
          filters[group.key].length === 0 || filters[group.key].includes(product[group.key])
      )
      return matchesTerm && matchesFilters
    })

    const finalPrice = (p) => p.priceDiscount ?? p.price
    if (sort === "lowest") return [...result].sort((a, b) => finalPrice(a) - finalPrice(b))
    if (sort === "highest") return [...result].sort((a, b) => finalPrice(b) - finalPrice(a))
    return result
  }, [term, filters, sort])

  const total = visibleProducts.length
  const countText = `${total} ${total === 1 ? "produto" : "produtos"}`
  const title = term ? `Resultados para "${term}" - ${countText}` : countText
  const hasFilters = Object.values(filters).some((values) => values.length > 0)

  return (
    <Layout>
      <div className="listing container">
        <aside className="listing__sidebar">
          <label className="listing__sort">
            <span>Ordenar por</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="relevance">Mais relevantes</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </label>

          <div className="listing__filters">
            <h2 className="listing__filters-title">Filtrar por</h2>
            <hr />
            {filterGroups.map((group) => (
              <FilterGroup
                key={group.key}
                title={group.title}
                inputType={group.inputType}
                options={group.options}
                name={group.key}
                selected={filters[group.key]}
                onChange={(value, checked) => handleFilterChange(group, value, checked)}
              />
            ))}
            {hasFilters && (
              <button type="button" className="listing__clear" onClick={() => setFilters(emptyFilters)}>
                Limpar filtros
              </button>
            )}
          </div>
        </aside>

        <div className="listing__results">
          <Section title={title} titleAlign="left">
            {total > 0 ? (
              <ProductListing products={visibleProducts} columns={3} />
            ) : (
              <p className="listing__empty">
                Nenhum produto encontrado. Tente outros termos ou remova alguns filtros.
              </p>
            )}
          </Section>
        </div>
      </div>
    </Layout>
  )
}

export default ProductListingPage
