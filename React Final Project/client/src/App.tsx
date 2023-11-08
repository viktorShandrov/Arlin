

import './App.css'
import Story from "./Story/Story"
import StoryList from "./Story-list/StoryList"
import TranslationContainer from "./TranslationContainer/TranslationContainer";
import AddChapterPanel from "./admin/addChapter/AddChapterPanel";
import {createContext, useState} from "react";
   export const chapterContext = createContext<any>(undefined)
function App() {
    const [chapter,setChapter] = useState({})


  return (
      <>
          <chapterContext.Provider value={[chapter,setChapter]}>
              <main>
                  <StoryList />
                  <Story />
                  <TranslationContainer/>
              </main>
          </chapterContext.Provider>

        <AddChapterPanel/>
      </>

  )
}

export default App
