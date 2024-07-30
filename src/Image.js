import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { RANDOM_IMAGE_URL } from "./constants";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1
  },
}

export default function Image() {
  let imgUrls = useImages()

  return (
    <>
      <h1>Random Images</h1>
      <div style={{ position: 'relative' }}>
        <Carousel
          responsive={responsive}
          arrows
          autoPlaySpeed={3000}
          renderDotsOutside
          showDots
        >
          {imgUrls.length !== 0 && imgUrls.map(url => (
            <div key={url} style={{ textAlign: "center" }}>
              <img src={url} alt="" style={{ width: 400 }} />
            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

function useImages() {
  let [imgUrls, setImgUrls] = useState([])

  useEffect(() => {
    const getImageUrl = async () => {
      for (let i = 0; i < 3; i++) {
        let response = await fetch(RANDOM_IMAGE_URL)
        let data = await response.json()
        setImgUrls((old) => [...old, data.message])
      }
    }

    getImageUrl()
  }, [])

  return imgUrls
}