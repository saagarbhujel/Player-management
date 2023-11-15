
import LeftSideBar from '../components/LeftSideBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
  <div className="w-full md:flex">
    <LeftSideBar/>

    <section>
        <Outlet/>
    </section>
  </div> 
  )
}

export default RootLayout