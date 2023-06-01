import { useState } from "react"
import peopleData from "./data.jsx"
import { FaQuoteRight } from "react-icons/fa"
import { FiChevronRight } from "react-icons/fi"
import { FiChevronLeft } from "react-icons/fi"
import { useEffect } from "react"

const App = () => {
  const [people, setPeople] = useState(peopleData)
  const [indexValue, setIndexValue] = useState(0)

  useEffect(() => {
    if (indexValue < 0) {
      setIndexValue(people.length - 1)
    }

    if (indexValue > people.length - 1) {
      setIndexValue(0)
    }
  }, [people, indexValue])

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setIndexValue(indexValue + 1)
    }, 5000)

    return () => {
      clearInterval(autoSlide)
    }
  }, [indexValue])

  return (
    <main>
      <section className="slider-container">
        {people.map((person, index) => {
          const { id, image, name, title, quote } = person
          let position = "person-article is-next"
          if (index === indexValue) {
            position = "person-article is-active"
          }
          if (
            index === indexValue - 1 ||
            (indexValue === 0 && index === people.length - 1)
          ) {
            position = "person-article is-last"
          }
          return (
            <article className={position} key={id}>
              <img className="person-img" alt={name} src={image} />
              <h3 className="person-name">{name}</h3>
              <h4 className="title">{title}</h4>
              <p className="quote">{quote}</p>
              <FaQuoteRight className="icon-quote" />
            </article>
          )
        })}

        <button
          onClick={() => setIndexValue(indexValue - 1)}
          className="prev-btn"
        >
          <FiChevronLeft className="prev-icon" />
        </button>
        <button
          onClick={() => setIndexValue(indexValue + 1)}
          className="next-btn"
        >
          <FiChevronRight className="next-icon" />
        </button>
      </section>
    </main>
  )
}
export default App
