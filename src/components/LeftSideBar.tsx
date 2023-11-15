
import { Link, NavLink, useLocation } from 'react-router-dom'
import { sidebarLinks } from '../constants';
import { INavLink } from '../types';

const LeftSideBar = () => {

    const {pathname} = useLocation();
  return (
    <nav className="leftsidebar">
      <div className=" flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.png"
            className='invert-white'
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        {/* {isLoading || !user.email ? (
          <div className=" h-14">
            <Loader />
          </div>
        ) : ( */}
          <Link to={`/profile/`} className="flex gap-3 items-center">
           
            <div className="flex flex-col">
              <p className="body-bold first-letter:capitalize">{"saagar"}</p>
              <p className="small-regular text-light-3">@{"ocean"}</p>
            </div>
          </Link>
        {/* )} */}

        <ul>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li className={`leftsidebar-link group ${ isActive && 'bg-primary-500'}`} key={link.label}>
                <NavLink className={'flex gap-4 items-center p-4'} to={link.route}>
                  {/* <img src={link.imageUrl} alt={link.label} className={` group-hover:invert-white ${isActive && 'invert-white'}`} /> */}
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <Button 
      variant={'ghost'}
      className="shad-button_ghost"
      onClick={handleSignOut}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className=" small-medium lg:base-medium">Logout</p>
      </Button> */}
    </nav>
        


  
  )
}

export default LeftSideBar