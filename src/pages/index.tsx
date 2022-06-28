import { NavbarComponent } from '@components/Navbar'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div>
      <NavbarComponent />
      <p>home</p>
    </div>
  )
}

export default Home
