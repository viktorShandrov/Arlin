import Sentence from "./Sentence/Sentence.tsx";
import {useEffect, useState} from "react";
import { useLocation, useNavigate, useParams} from "react-router-dom";
import {request} from "../functions";
import styles from "./Story.module.css"
export default function Story(){

    const urlLocation = useLocation()
    const navigate = useNavigate();

    const [chapter,setChapter] = useState({
        text:""
    })



    const {chapterId} = useParams()
    const getChapter=(chapterId:string)=>{
         request(`chapters/${chapterId}`).subscribe(
             (res)=>{
                 setChapter(res)
             },
             (error)=>{
                 console.log(error)
             }
         )
    }
    const handleNavigation = (sentence:string) => {
        const pathArr = urlLocation.pathname.split("/")

       const lastPath = pathArr[pathArr.length-1]
        let currentPathWithoutLastSegment=urlLocation.pathname
        if(!lastPath.includes("chapterId=")){
            currentPathWithoutLastSegment = urlLocation.pathname
                .split('/')
                .slice(0, -1)
                .join('/');
        }

        navigate(`${currentPathWithoutLastSegment}/${sentence}`);
    };


    useEffect(()=>{
        getChapter(chapterId!.split("chapterId=")[1])

    },[chapterId])

        let sentences:any =[]
        if(chapter){
             sentences = chapter.text.split(".")
        }


    return(
        <div className={styles.storyWrapper}>
            <div className={styles.story}>
                <div className={styles.textContainer}>
                    {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias aliquid aperiam assumenda aut cum cumque cupiditate ducimus eaque excepturi explicabo impedit in ipsa odio officiis omnis, optio porro possimus quas quibusdam sapiente similique sint, sit soluta ullam voluptatem voluptatibus! Aliquid aspernatur consequuntur corporis deserunt dolorum error expedita, facere fugiat inventore iusto laborum libero minima molestiae nemo nihil nobis officiis provident saepe similique velit? A earum facere harum impedit in itaque non pariatur, possimus qui. Culpa dolores earum impedit molestiae quia sed! Consequuntur delectus distinctio, dolorum eveniet, impedit incidunt modi nam non odit perspiciatis quas quibusdam quidem reiciendis sed sunt totam ut voluptates. A at cupiditate debitis dolores ducimus ea eaque error, eum ex hic incidunt ipsam iste maiores minima molestiae molestias nam nobis obcaecati odit perspiciatis possimus quis quod soluta tempore ut. A animi architecto blanditiis consequatur delectus doloribus eaque et incidunt itaque, iusto laborum minus mollitia necessitatibus nihil nisi numquam officiis quae quam quia quisquam reiciendis rerum sapiente tenetur unde veniam voluptatem voluptatibus? Cum, illo, ipsa? Deleniti error id, illum itaque minima pariatur quae quisquam quod reiciendis temporibus. A alias aliquam aperiam at atque, commodi consequuntur debitis deserunt doloribus eaque, enim expedita id inventore iste iure iusto labore laboriosam laborum libero maxime minus molestias necessitatibus neque nobis odio odit pariatur quasi qui quia quibusdam rerum sequi similique tempore temporibus unde vero vitae. Adipisci consectetur corporis cum delectus dolorem dolorum ea eos et eum exercitationem facere facilis fugit ipsum maxime nostrum numquam, officiis quae quasi quia quisquam recusandae reprehenderit rerum soluta tenetur unde vero voluptas voluptatibus. At culpa, cum dolore doloremque dolorum ducimus enim fuga harum incidunt, iste, iusto laudantium modi molestiae nam nesciunt numquam possimus provident quae quibusdam quis quo recusandae reiciendis repellendus repudiandae rerum sunt ut vel velit voluptates voluptatibus. Accusantium animi beatae commodi consequuntur culpa dolorem doloremque enim eveniet harum in iste iusto nesciunt nihil nobis odio officia quae quam quisquam repudiandae rerum sequi, tempora totam ullam unde velit, veniam voluptatem voluptatum. Aperiam at commodi corporis esse eum, magnam necessitatibus praesentium quisquam rem vitae! Animi commodi dolorum iure molestias nihil nobis sequi similique, veniam? A alias aliquid aperiam assumenda aut culpa cupiditate doloremque enim esse excepturi explicabo fuga fugiat id illo illum in incidunt inventore laudantium nam numquam pariatur perspiciatis placeat provident quae quia quibusdam quo recusandae reiciendis, reprehenderit, similique sit sunt temporibus totam ullam unde ut voluptatem? Aliquid atque aut consectetur, corporis culpa deleniti deserunt dolores ducimus eaque eligendi eos incidunt ipsa itaque nulla numquam odit provident quisquam quos ratione repellat reprehenderit repudiandae saepe similique sint vel voluptate voluptatem voluptates. Ab ad aliquid aut deserunt doloremque earum error eum hic, impedit ipsam ipsum modi obcaecati perspiciatis possimus, recusandae repellendus velit voluptatum! Enim labore nulla quod recusandae rem? Amet, assumenda debitis delectus doloremque ea esse nemo nesciunt. Cum obcaecati quia ratione suscipit. Aliquam dignissimos ducimus, eaque illo illum laudantium magni numquam odit quae quia reprehenderit vel veniam voluptate? Ad atque, debitis delectus deleniti dignissimos dolorum ducimus, eaque earum ex fugiat ipsa laborum laudantium maiores maxime nam numquam odio porro quo rem repudiandae temporibus vitae voluptatem voluptatum. Ad aperiam cum, debitis distinctio, esse ex excepturi inventore iure maiores mollitia nobis qui quos, saepe sequi sint sit voluptatem! Aperiam dicta eos ex nesciunt numquam pariatur quae quas, quisquam quod quos. Animi cumque dicta eos ipsum quod sit, soluta tempore totam. Accusantium, animi architecto assumenda consequuntur harum laudantium maxime molestiae nemo pariatur perspiciatis, quibusdam, quod similique. Ad atque aut corporis cupiditate debitis dolorem dolores dolorum eligendi enim eos eum fuga inventore iusto labore laboriosam magni mollitia natus nemo numquam, odio pariatur praesentium quam quibusdam, quo recusandae reiciendis rem reprehenderit sed similique sint sit sunt tempora voluptatibus. Animi corporis delectus ratione sapiente veritatis. Commodi consectetur cum eum exercitationem facere id in, incidunt, iusto libero nemo nobis quaerat ullam, voluptatum. Ab assumenda aut consequatur, cum deserunt, dolorem dolores earum, et eum ex facilis fugiat harum ipsam magnam maiores maxime mollitia nisi non odit officiis porro qui reiciendis rerum saepe similique temporibus veniam. Aliquam corporis debitis delectus deleniti, doloribus dolorum eos expedita ipsa odio, quaerat repellendus reprehenderit, soluta vel! Animi asperiores assumenda cumque, delectus dolores eaque eum fugiat harum labore laboriosam magni maiores quae saepe veniam voluptatibus! Ab consectetur cupiditate deserunt illum suscipit. Dicta dolorem facilis illum libero magnam nam perspiciatis quas tempora ut veniam. A eos iusto non nostrum voluptatum? Distinctio quia tempore vero! Delectus distinctio, ducimus esse exercitationem ipsam perspiciatis porro quae quibusdam reiciendis sed sint, vero. Accusamus, ad architecto autem consequuntur expedita laudantium minus nam nihil nulla praesentium provident quidem sint veritatis vitae voluptatum. Earum eum ipsam libero quasi recusandae. Amet aperiam assumenda exercitationem harum numquam quas totam ut voluptatem? Aliquid expedita ipsa modi non rerum. Aliquid corporis delectus dolores esse expedita ipsa minus natus nemo nisi nobis perspiciatis porro praesentium quam quibusdam sequi, sunt tenetur vitae voluptatem. Accusantium, adipisci aperiam blanditiis ducimus eligendi error fugit ipsam laboriosam laudantium modi neque nisi, officia officiis porro quae ratione soluta sunt tempora ullam unde vel vitae voluptatem! Ab ad amet at blanditiis consectetur cumque delectus deleniti dignissimos enim esse est facere, fugit iste itaque magnam maiores minus modi necessitatibus obcaecati odit pariatur perferendis, porro possimus praesentium quas quasi quibusdam quisquam recusandae repellendus saepe sequi similique sint soluta tempora veritatis voluptates voluptatum. At atque delectus explicabo incidunt iure maxime, mollitia sapiente sequi temporibus vitae? Dolorem eius explicabo itaque nesciunt quod. Atque fugiat nobis saepe? Accusamus aliquid deserunt doloribus ducimus libero nulla sed vel vitae! Alias aliquam asperiores autem cupiditate dicta, distinctio doloribus hic id inventore minus omnis porro provident rem repellat repellendus rerum saepe soluta tenetur vero voluptatum. Accusantium adipisci, dolore dolorem esse non numquam quae, qui quidem sed similique veniam voluptatem? Aliquam animi architecto aut consectetur consequatur doloribus dolorum eius error eveniet exercitationem harum illo illum impedit in itaque libero maiores minus natus, nesciunt numquam perspiciatis placeat porro quaerat quas qui quia repellat saepe similique sint sit totam vitae voluptatibus voluptatum! Deserunt expedita numquam odio voluptatum? Amet, aut dolore eveniet expedita ipsum iure iusto neque quidem quisquam rem sed similique sit.*/}
                    {sentences.map((sentence:string,index:number)=>
                        <div  key={index} onClick={()=>handleNavigation(sentence)}>
                            <Sentence   text={sentence} />

                        </div>
                    )}
                </div>

                <div className={styles.btns}>
                    <button className={styles.previousChapter}>Previous chapter</button>
                    <button className={styles.nextChapter}>Next chapter</button>
                </div>
            </div>
        </div>


    )
}