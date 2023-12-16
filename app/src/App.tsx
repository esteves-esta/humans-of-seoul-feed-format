import FeedProvider from './components/FeedProvider'
import Home from './components/Home'
import ThemeProvider from './components/ThemeProvider'

function App() {

  return (
    <ThemeProvider>
      <FeedProvider>
        <Home />
      </FeedProvider>
    </ThemeProvider>
  )
}

export default App
