import { useEffect, useState } from "react"
import Carousel from "react-multi-carousel"
import { useParams } from "react-router-dom"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1
  },
}

export default function CrtBreed() {
  let { crtBreed, subCrtBreed } = useParams()
  let url = subCrtBreed ? `https://dog.ceo/api/breed/${crtBreed}/${subCrtBreed}/images` : `https://dog.ceo/api/breed/${crtBreed}/images`
  let [imagesUrl, setImagesUrl] = useState([])

  useEffect(() => {
    const getCrtBreedImages = async () => {
      let response = await fetch(url)
      let data = await response.json()
      setImagesUrl(data.message.splice(0, 4))
    }
    getCrtBreedImages()
  })

  return (
    <div style={{ position: 'fixed', width: '80%', right: 0, top: '20vh', zIndex: 1 }}>
      <Carousel
        responsive={responsive}
        arrows
        autoPlaySpeed={3000}
        renderDotsOutside
        showDots
      >
        {imagesUrl.map(url => (
          <div key={url} style={{ textAlign: "center" }}>
            <img src={url} alt="" style={{ height: '60vh' }} />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
