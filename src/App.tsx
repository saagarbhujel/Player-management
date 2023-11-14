import {Route, Routes} from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout.tsx";
import SignInForm from "./_auth/forms/SignInForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";
import Home from "./pages/Home.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";


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
              <Route element={<RequireAuth roles={['admin', 'staff', 'player']} />} >
                <Route path="/" element={<Home/>} />
              </Route>

              </Route>
       </Routes>

   </main>
  )
}

export default App
