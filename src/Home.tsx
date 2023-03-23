import { CardsArea } from './components/CardsArea'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { SearchArea } from './components/SearchArea'

const Home = () => {
  return (
    <>
      <Header />
      <SearchArea />
      <CardsArea />
      <Footer />
    </>
  )
}

export default Home