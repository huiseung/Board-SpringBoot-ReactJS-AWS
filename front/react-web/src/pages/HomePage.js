import { PAGE_URL } from "../utils/uris";
import { Link } from 'react-router-dom'

export default function HomePage(){
   return(
       <div>
           <h1>Home</h1>
           <Link to={PAGE_URL.POSTLIST}><button>GET POST LIST</button></Link>
       </div>
   )
}