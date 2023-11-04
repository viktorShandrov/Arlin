

import './App.css'
import Story from "./Story/Story"
import StoryList from "./Story-list/StoryList"
import TranslationContainer from "./TranslationContainer/TranslationContainer";
function App() {


  return (
    <main>
        <StoryList />
        <Story />
        <TranslationContainer/>
    </main>
  )
}

export default App
