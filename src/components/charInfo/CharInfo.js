import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import CustomForm from "../form/Form";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";

import "../charInfo/charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, cleanError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    cleanError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    
  };


  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
		<>
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
		{/* <div className="char__form">
			<CustomForm />
		</div> */}
		</>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const listVariants = {
    visible: (i) => ({
      opacity: 1,

      transition: {
        delay: i * 0.1,
      },
    }),
    hidden: { opacity: 0 },
  };

  const addComics = comics.map((item, i) => {
    if (i < 10) {
      return (
        <motion.li
          key={i}
          className="char__comics-item"
          variants={listVariants}
          initial="hidden"
          animate="visible"
          custom={i}
        >
          <Link
            to={`/comics/${item.resourceURI.replace(/\D/g, "").slice(1)}`}
            className="char__comics-item-href"
          >
            {item.name}
          </Link>
        </motion.li>
      );
    }
  });

  const noComics = (
    <motion.li
      key="0"
      className="char__comics-item"
      variants={listVariants}
      initial="hidden"
      animate="visible"
      custom={1}
    >
      Информация о комиксах отсутствует
    </motion.li>
  );

  const checkComics = comics.length ? addComics : noComics;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="char__basics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={thumbnail} alt={name} />
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </motion.div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">{checkComics}</ul>
      </AnimatePresence>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
