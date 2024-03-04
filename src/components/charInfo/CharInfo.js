import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
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
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics, comicsUrl } = char;


  const addComics = comics.map((item, i) => {
    if (i < 10) {
      return (
        <li key={i} className="char__comics-item">
          <a href={comicsUrl} className="char__comics-item-href">
            {item.name}
          </a>
        </li>
      );
    }
  });

  const noComics = (
    <li key="0" className="char__comics-item">
      Информация о комиксах отсутствует
    </li>
  );

  const checkComics = comics.length ? addComics : noComics;

  return (
    <>
      <div className="char__basics">
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
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{checkComics}</ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
