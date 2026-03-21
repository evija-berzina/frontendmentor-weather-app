import {Header} from './components/Header'
import {Home} from './pages/Home'
import {Error} from './pages/Error'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <main>
        {/* { error ? <Error /> : <Home /> } */}
        <Home />
        <Error />
      </main>
    </>
  )
}

export default App
