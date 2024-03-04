import "../singleComics/singleComics.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const SingleComics = () => {
	const {comicsId} = useParams();

	const [comicsInfo, setComicsInfo] = useState(null);

	const {getComics, loading, error, cleanError} = useMarvelService();

	useEffect(() => {
    updateComics();
  }, []);

  const updateComics = () => {
		cleanError();
    getComics(comicsId).then(onComicsLoaded);
  };

  const onComicsLoaded = (comics) => {
    setComicsInfo(comics);
  };

	
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comicsInfo) ? <View comicsInfo={comicsInfo} /> : null;

	return (		
		<>			
			{errorMessage}
			{spinner}			
			{content}
		</>
			
		
	)
}

const View = ({comicsInfo}) => {
	const { thumbnail, title, description, price, pageCount, language } = comicsInfo;

	return (		
		<div className="single-comics">
			<img className="single-comics__img" src={thumbnail} alt={title} />
			<div className="single-comics__info">
				<div className="single-comics__info__title">{title}</div>
				<div className="single-comics__info__desc">{description}</div>
				<div className="single-comics__info__pages">{pageCount}</div>
				<div className="single-comics__info__lang">Language: {language}</div>
				<div className="single-comics__info__price">{price}$</div>
			</div>
			<Link to={"/comics"} className="single-comics__info__backlink">Back to all</Link>
			</div>
	)
}

export default SingleComics;