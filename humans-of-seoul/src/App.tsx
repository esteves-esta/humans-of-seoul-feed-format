import { Home } from 'lucide-react'
import './App.css'
import FeedProvider from './components/FeedProvider'

function App() {

  return (
    <FeedProvider>
      <Home />
    </FeedProvider>
  )
}

export default App
