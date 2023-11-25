import React, { useState } from 'react'

const ManageUsers = () => {

  const [active, setActive] = useState('users');

  if(active === 'users') {
    document.title = 'Player Management- All Users'
  } else {
    document.title = 'Player Management- Create User'
  }
  // document.title = 'Player Management-Manage Users'
  return (
    <div className='flex m-auto flex-col w-[70vw] mt-2'>
      <div>
        <ul className='flex w-full  bg-green-300/30 rounded-md '>
          <button 
          type='button'
          className={` ${active === 'users' ? 'text-white bg-blue-500 rounded-l-md py-3 ' : ""} flex-1`}
          onClick={() => setActive('users')}
          >
            All Users
          </button>

          <button className={`${active === 'createUser' ? 'text-white bg-blue-500 rounded-r-md py-3 ' : "" } flex-1`}
          onClick={() => setActive('createUser')}
          >
            Create User
          </button>
        </ul>
      </div>
      <div>
        {
          active === 'users' ? (
            <div>
              <h2>All Users</h2>
            </div>
          ): (
            <div>
              <h2>Create User</h2>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ManageUsers