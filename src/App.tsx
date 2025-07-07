import { sample } from './sample'
import './App.css'
import { ContractDocument } from './ContractDocument'

function App() {


  return (
    <>
      <ContractDocument document={sample} />
    </>
  )
}

export default App
