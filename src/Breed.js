import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, IconButton, List, ListItem, ListSubheader } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { DOG_BREEDS_URL } from "./constants";
import { useNavigate } from "react-router-dom";

export default function Breed() {
  let [open, setOpen] = useState(false)
  let breedList = useBreed({})
  const navigate = useNavigate();

  const handleClick = (e, breed, expand) => {
    e.stopPropagation()
    setOpen({
      ...open,
      [breed]: expand,
    })
  }

  return (
    <List
      subheader={
        <ListSubheader component='h1'>
          Breed List
        </ListSubheader>
      }
    >
      {breedList.map(breedObj => (
        <Fragment key={breedObj.breed}>
          <ListItem sx={{ cursor: 'pointer' }} onClick={() => navigate(`/breeds/${breedObj.breed}`)} >
            {breedObj.breed}
            {!!breedObj.subBreeds.length &&
              <>
                {open[breedObj.breed] ? (
                  <IconButton onClick={(e) => handleClick(e, breedObj.breed, false)}>
                    <ExpandLess />
                  </IconButton>
                ) : (
                  <IconButton onClick={(e) => handleClick(e, breedObj.breed, true)}>
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
                  <ListItem
                    sx={{ pl: 4, cursor: 'pointer' }}
                    key={subBreed}
                    onClick={() => navigate(`/breeds/${breedObj.breed}/${subBreed}`)}
                  >
                    {subBreed}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  )
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