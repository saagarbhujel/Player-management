import useAuth from "../hooks/useAuth"
import SearchBar from "./SearchBar"

const NavBar = () => {

  const {user} = useAuth()
  return (
    <div className='w-full h-16 flex items-center justify-center z-20'>
      {
        user.role === ('admin' || "staff") ? (
          <SearchBar />
        ):(null)
      }
    </div>
  )
}

export default NavBar