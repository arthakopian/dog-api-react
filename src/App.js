import React, { Fragment, useEffect, useState } from "react";
import { RANDOM_IMAGE_URL, DOG_BREEDS_URL } from './constants'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import List from '@mui/material/List';
import { Collapse, IconButton, ListItem, ListSubheader } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 0 },
    items: 1
  },
}

export default function App() {
  let [open, setOpen] = useState(false)
  let imgUrls = useImages()
  let breedList = useBreed({})

  const handleClick = (breed, expand) => {
    setOpen({
      ...open,
      [breed]: expand,
    })
  }

  return (
    <div className="App">
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
      <List
        subheader={
          <ListSubheader component="h1">
            Breed List
          </ListSubheader>
        }
      >
        {breedList.map(breedObj => (
          <Fragment key={breedObj.breed}>
            <ListItem >
              {breedObj.breed}
              {!!breedObj.subBreeds.length &&
                <>
                  {open[breedObj.breed] ? (
                    <IconButton onClick={() => handleClick(breedObj.breed, false)}>
                      <ExpandLess />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleClick(breedObj.breed, true)}>
                      <ExpandMore />
                    </IconButton>
                  )}
                </>
              }
            </ListItem>
            {!!breedObj.subBreeds.length && (
              <Collapse in={open[breedObj.breed]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {breedObj.subBreeds.map((subBreed) => (
                    <ListItem sx={{ pl: 4 }} key={subBreed}>
                      {subBreed}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </Fragment>
        ))}
      </List>
    </div>
  );
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

function useBreed() {
  let [breedList, setBreedList] = useState([])
  useEffect(() => {
    const getBreedList = async () => {
      let response = await fetch(DOG_BREEDS_URL)
      let data = await response.json()

      const newData = Object.keys(data.message).map(breed => ({
        breed,
        subBreeds: data.message[breed]
      }
      ))
      setBreedList(newData)
    }

    getBreedList()
  }, [])

  return breedList
}