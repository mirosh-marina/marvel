import ComicsBanner from "../comicsBanner/ComicsBanner";
import SingleChar from "../singleChar/SingleChar";

const SingleCharPage = (props) => {
	return (
		<>
		<ComicsBanner />
		<SingleChar charFinded={props}/>		
		</>
		
	)
}

export default SingleCharPage;