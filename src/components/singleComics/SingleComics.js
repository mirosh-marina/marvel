import "../singleComics/singleComics.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const SingleComics = () => {
  const { comicsId } = useParams();

  const [comicsInfo, setComicsInfo] = useState(null);

  const { getComics, cleanError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, []);

  const updateComics = () => {
    cleanError();
    getComics(comicsId)
			.then(onComicsLoaded)
			.then(() => setProcess('confirmed'));
  };

  const onComicsLoaded = (comics) => {
    setComicsInfo(comics);
  };



  return (
    <>
     {setContent(process, View, comicsInfo)}
    </>
  );
};

const View = ({ data }) => {
  const { thumbnail, title, description, price, pageCount, language } =
    data;

  return (
    <motion.div
      className="single-comics"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>

      <img className="single-comics__img" src={thumbnail} alt={title} />
      <div className="single-comics__info">
        <div className="single-comics__info__title">{title}</div>
        <div className="single-comics__info__desc">{description}</div>
        <div className="single-comics__info__pages">{pageCount}</div>
        <div className="single-comics__info__lang">Language: {language}</div>
        <div className="single-comics__info__price">{price}$</div>
      </div>
      <Link to={"/comics"} className="single-comics__info__backlink">
        Back to all
      </Link>
    </motion.div>
  );
};

export default SingleComics;
