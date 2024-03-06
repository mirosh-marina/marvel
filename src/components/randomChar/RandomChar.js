import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "../randomChar/randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const { loading, error, getCharacter, cleanError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    cleanError();
    getCharacter(id).then(onCharLoaded);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div onClick={updateChar} className="inner">
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const {
    name,
    description,
    thumbnail,
    noThumbnailOne,
    noThumbnailTwo,
    homepage,
    wiki,
  } = char;

  return (
    <motion.div
      className="randomchar__block"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: .5 }}
    >
      <motion.img
        src={thumbnail}
        alt="Random character"
        style={noThumbnailOne || noThumbnailTwo ? { objectFit: "fill" } : null}
        className="randomchar__img"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .5 }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description !== "" ? description : "Описание отсутствует"}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default RandomChar;
