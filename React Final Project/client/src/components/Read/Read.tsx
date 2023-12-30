import StoryList from "../Story-list/StoryList";
import Story from "../Story/Story";
import TranslationContainer from "../TranslationContainer/TranslationContainer";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import ChapterList from "../ChapterList/ChapterList";
import styles from "./Read.module.css"
import ContinueBookElement from "./ContinueBookElement/BookElement";
import {useSelector} from "react-redux";
import {useEffect} from "react";
export default  function Read(){

    const {user} = useSelector((selector:any)=>selector.user)
    const navigate = useNavigate()
    const continueReadingHandler=(e:any)=>{
        const target = e.currentTarget
        target.classList.add(styles.clicked)
        setTimeout(()=>{

            navigate(`/main/read/${user.lastReading.bookId}/chapterId=${user.lastReading.chapterId}`)
            target.classList.remove(styles.clicked)
        },1000)

    }
    useEffect(()=>{

    },[])
    const book  = {
        "_id": "658c58f16d72a3ba8283876e",
        "ownedBy": [
            "65508fdeccc7a3385a3e537d",
            "655e46519aeb8b6714122f72",
            "6578a8dda11fee0f46bd679a"
        ],
        "chapters": [],
        "name": "Над камъка",
        "length": 0,
        "author": "Йордан Йовков",
        "resume": "Hi, Mike-One,\" I said.\n\n\"Good morning, Daddy.\" Very formal, and solemn. A bad sign, I thought.\n\nI gave him a big reassuring grin and waved him into a chair. \"This is a pleasant surprise, Mike-One. I hardly ever have a caller during Ice Cream Recess.\"\n\nHe squirmed in the chair, looking down at his feet. \"I—I could come back later, Daddy.\"\n\n\"No, no,\" I said hastily, \"that's all right. A feller must have something pretty important on his mind to bring him all the way up to Daddy's office at Ice Cream time.\"\n\nMike-One fidgeted. He tugged at a lock of hair and began to twist it. \"Well....\"\n\n\"Come on,\" I cajoled. \"What's it all about? That's what Daddy's here for, you know—to listen to your troubles!\"\n\nHe scuffed his feet around on the floor. Then he took out a handkerchief and blew his nose. \"Well ... see, I got a buddy—well, he ain't really my best buddy, or even second best. Sometimes we play chess together. Or checkers, only he thinks checkers is silly.\"\n\nI cleared my throat and smiled patiently, waiting for him to come to the point. When he didn't go on I said, \"What's his name?\"\n\n\"Uh ... Adam.\"\n\n\"Adam-Two, or -Three?\"\n\n\"-Two.\"\n\nI nodded. \"Okay, go on.\"\n\n\"He talks crazy, an' he's always wonderin' about things. I never seen a kid to wonder so much. An' he's only twenty-three.\"\n\nI nodded again. \"And now he's got you to wonderin' about something and you want Daddy to straighten you out. Right?\"\n\n\"Uh-huh.\"\n\n\"Okay,\" I said, \"shoot!\"\n\nHe sniffed and scuffed his feet and scrooched around in the chair some more. Then suddenly he opened his eyes wide and looked me square in the face and blurted: \"Is there really a Santa Claus?\"\n\nThe grin I was wearing froze on my face. It seemed I'd been waiting twenty years for one of the Kids to ask me that question. Daddy, is there a Santa Claus? A loaded question, loaded and fused and capable of blasting the Fairyland Experiment into space-dust.\n\nMike-One was waiting for an answer, I had to deal with the crisis of the moment and worry about implications later.\n\nI stood up and walked around the desk and put my hands on his shoulders. \"Mike,\" I said, \"how many Christmases can you remember?\"\n\n\"Gee, Daddy, I don't know. Lots and lots.\"\n\n\"Let's see, now. You're thirty-eight, and Christmas comes twice a year, so that's two times thirty-eight—seventy-six Christmases. Of course, you can't remember all of them. But of the ones you remember, did you ever not see Santa Claus, Mike?\"\n\n\"No, Daddy. I always saw him.\"\n\n\"Well then, why come asking me if there is such a person when you know there is because you see him all the time?\"\n\nMike-One looked more uncomfortable than ever. \"Well, Adam-Two says he don't think there is a Cold Side of Number One Sun. He thinks it's hot all the way around, an' if that's so then Santa Claus couldn't live there. He says he thinks Santa Claus is just pretend an' that you or somebody from the Council of Uncles dresses up that way at Christmastime.\"\n\nI scowled. How the devil had Adam-Two managed to figure that one out?\n\n\"Listen, Mike,\" I said. \"You trust your Daddy, don't you?\"\n\n\"Golly. Course I do!\"\n\n\"All right, then. There is a Santa Claus, Mike-One. He's as real as you or me or the pink clouds or the green rain.... He's as real as Fairyland itself. So just don't pay any more attention to Adam-Two and his crazy notions. Okay?\"\n\nHe grinned and stood up, blinking his eyes to hold back the tears. \"Th-thank you, Daddy!\"\n\nI clapped him on the back. \"You're welcome, pal. Now if you hurry, you just might get back down in time for a dish of ice cream!\"\n\nWhen the indicator over the elevator door told me that Mike-One had been safely deposited at the bottom of Daddy's Tower, I walked across the circular office to the windows facing the Compound.\n\nIce Cream Recess was about over and the Kids were straggling out in all directions from the peppermint-striped Ice Cream and Candy Factory just to the right of the Midway entrance. Except for the few whose turn it was to learn \"something new\" in Mommy's school room, they were on their own from now until Lunchtime. It was Free-Play period.\n\nFrom my hundred-foot high vantage point, I watched them go; walking, running, skipping or hopping toward their favorite play spots. They had their choice of the slides and swings in the Playground, the swimming pool, tennis courts, ball diamond, gridiron, golf course, bowling alley and skating rinks—and of course, the rides on the Midway.\n\nI watched them go, and my heart thumped a little faster. My gang, I thought.... Not really mine, of course, except from the standpoint of responsibility, but I couldn't have loved them more if I'd sired each and every one of them. And Mommy (sometimes I almost forgot her name was Ruth) felt the same way. It was a funny thing, this paternal feeling—even a little weird, if I stopped to remember that a baker's dozen of them were actually older than I. But a child is still a child, whatever his chronological age may be, and the inhabitants of Fairyland were children in every sense except the physical.\n\nIt was a big job, being Daddy to so many kids—but one that had set lightly on my shoulders, so far. They were a wonderful gang, healthy and happy. Really happy. And I couldn't think of a single place in the Universe where you'd find another hundred and thirty-seven human beings about whom you could make that statement.\n\nA wonderful gang ... all sizes and shapes and personalities, ranging in physical age from five to forty-three. Mental age ... well, that was another story. After years of research and experimentation, we'd settled on eight as the optimum of mental development. And so, there wasn't a Kid in Fairyland mentally older than eight years....\n\nOr was there?\n\nMike-One's confused story of his friend Adam-Two re-echoed in my head. He says he don't think there is a Cold Side of Number One Sun. He thinks it's hot all the way around. He says he thinks Santa Claus is just pretend....\n\nSomething was wrong. Something big and important and dangerous, and I didn't know what I was going to do about it. Adam-Two, unlike some of the older Kids, had been born in Fairyland. There wasn't one single solitary thing in his life history to account for this sudden, terrifying curiosity and insight. Nothing. Not even pre-natal influence, if there is such a thing.\n",
        "genre": "Разказ",
        "releaseDate": "2023-11-09T00:00:00.000Z",
        "__v": 1,
        "image": "https://firebasestorage.googleapis.com/v0/b/arlin-learn-through-literature.appspot.com/o/images%2FScreenshot_3.png?alt=media&token=41fa9749-8855-4a87-b96d-ab1d471162a3",
        "rating": 8,
        "wishedBy": [
            "655e46519aeb8b6714122f72"
        ],
        "isRecommended": true
    }
    return(
        <>
            <main className={styles.main}>
                <div className={styles.listC}>
                        <Routes>


                            <Route path={"/"} element={<StoryList />}/>
                            <Route path={"/:bookId/:chapterId?/:textToTranslate?"} element={<ChapterList />}/>

                        </Routes>
                </div>
                <div className={styles.storyC}>
                    <div onClick={continueReadingHandler} className={styles.readBookC}>
                        <ContinueBookElement book={book}/>
                    </div>
                    <Routes>
                        <Route path={"/:bookId/:chapterId/:textToTranslate?"} element={<Story />}/>
                    </Routes>
                </div>

                <div className={styles.translatePanelC}>
                    <Routes>
                        <Route path={"/:bookId/:chapterId/:textToTranslate"} element={<TranslationContainer/>}/>
                    </Routes>
                </div>


            </main>



         </>


    )
}