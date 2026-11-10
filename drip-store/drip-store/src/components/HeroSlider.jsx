import { useState } from "react"
import { Link } from "react-router-dom"
import "./components-CSS/HeroSlider.css"
//import "../pages-CSS/HomePage.css"

const slides = [
  {
    label: "Melhores ofertas personalizadas",
    title: "Queima de stoque Nike 🔥",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    button: { text: "Ver Ofertas", to: "/product/1" },
    image: "/slide-tenis.png",
    alt: "Tênis Nike em oferta",
  },
  {
    label: "Melhores ofertas personalizadas",
    title: "Queima de stoque Nike 🔥",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    button: { text: "Ver Ofertas", to: "/product/1" },
    image: "/slide-tenisL.png",
    alt: "Tênis Nike em oferta",
  },
]

function HeroSlider() {
  const [index, setIndex] = useState(0)

  return (
    <section className="hero" aria-roledescription="carrossel" aria-label="Ofertas em destaque">
      <div className="hero__viewport">
        <div className="hero__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((slide, i) => (
            <div className="hero__slide" key={i} aria-hidden={i !== index}>
              <div className="hero__inner container">
                <div className="hero__text">
                  <p className="hero__label">{slide.label}</p>
                  <h2 className="hero__title">{slide.title}</h2>
                  <p className="hero__description">{slide.description}</p>
                  <Link
                    to={slide.button.to}
                    className="btn btn--primary hero__button"
                    tabIndex={i === index ? 0 : -1}
                  >
                    {slide.button.text}
                  </Link>
                </div>

                <div className="hero__media">
                  <span className="hero__pattern" aria-hidden="true" />
                  <img src={slide.image} alt={slide.alt} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__dots" role="tablist" aria-label="Escolher slide">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1} de ${slides.length}`}
            className={`hero__dot${i === index ? " hero__dot--active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider