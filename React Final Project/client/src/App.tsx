

import './App.css'
import Story from "./Story/Story"
import StoryList from "./Story-list/StoryList"
import TranslationContainer from "./TranslationContainer/TranslationContainer";
import AddChapterPanel from "./admin/addChapter/AddChapterPanel";
function App() {


  return (
      <>
          <main>
              <StoryList />
              <Story />
              <TranslationContainer/>
          </main>
        <AddChapterPanel/>
      </>

  )
}

export default App
