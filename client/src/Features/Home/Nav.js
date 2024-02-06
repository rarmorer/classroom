/*
import
initialize sesson
join session 
 */




    return (
      <div className="w-full">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <a class="no-underline" href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      {/* <Image
                        src="/public/favicon.ico"
                        alt="N"
                        width="32"
                        height="32"
                        className="w-8"
                      /> */}
                    </span>
                    <span>{JSON.parse(localStorage.getItem('User_Type')) === 'Teacher' ? 'Welcome Back, Ms. Teacher!' : 'Welcome Back, Student!'}</span>
                  </span>
                </a>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}
        <div className="hidden text-center lg:flex lg:items-center">
          <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
            {navigation.map((menu, index) => (
              <li className="mr-3 nav__item" key={index}>
                <a href="/" className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                    {menu}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
        <button onClick={() => joinVideo()} className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
            Join Video
          </button>
         { memberState.status === 'Teacher' && 
         <button onClick={() => endSession()} className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
            End Session
          </button>
          }
          <button onClick={() => logout()} className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
              {JSON.parse(localStorage.getItem('Logged_In')) ? 'Logout' : 'Login'}
          </button>
          {memberState.status === 'Teacher' && 
          <button onClick={() => setLetterModal(true)} className="px-6 py-2 text-white bg-indigo-600 rounded-md md:ml-5">
            Check for Letters!
          </button>
          }
        </div>
      </nav>
      <LetterModal/>
    </div>
  );

  }

export default NavBar;