import {Route, Routes} from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout.tsx";
import SignInForm from "./_auth/forms/SignInForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";

import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import{ Home} from "./_root/pages";
import RootLayout from "./_root/RootLayout.tsx";


function App() {


  return (
   <main className={'flex h-screen'}>
       <Routes>
        <Route element={<PersistLogin/>}>

        
           {/*Public Routes*/}
           <Route element={<AuthLayout/>}>
               <Route path={'sign-in'} element={<SignInForm/>} />
               <Route path={'sign-up'} element={<SignUpForm/>} />
           </Route>

              {/*Private Routes*/}
              <Route element={<RootLayout/>}>

              
              <Route element={<RequireAuth roles={['admin', 'staff', 'player']} />} >
                <Route index element={<Home/>} />
              </Route>

              </Route>

              </Route>
       </Routes>

   </main>
  )
}

export default App
