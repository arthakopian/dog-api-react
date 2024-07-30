import { Link } from "react-router-dom";
import { BREEDS_ROUT, IMAGES_ROUT } from "./constants";

export default function Header() {
  return (
    <div>
      <h1>Dog Api</h1>

      <Link to='/' >Home</Link>
      <br></br>
      <Link to={BREEDS_ROUT} >Breed</Link>
      <br></br>
      <Link to={IMAGES_ROUT} >Image</Link>
    </div>
  )
}