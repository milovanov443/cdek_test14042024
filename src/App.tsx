import { NewsBlock } from './components/NewsBlock/NewsBlock'

function App() {
  return (
    <div className="app">
      <main className="main-content">
        <div className="blocks-grid">
          <NewsBlock 
            variant="company" 
            title="Новости компании" 
            perPage={3} 
          />
          <NewsBlock 
            variant="business" 
            title="Бизнес" 
            perPage={3} 
          />
          <NewsBlock 
            variant="empty" 
            title="Архив" 
            perPage={3} 
          />
        </div>
      </main>
    </div>
  )
}

export default App
