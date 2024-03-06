import "../comicsList/comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(true);
  const [offset, setOffset] = useState(100);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [pageEnded, setPageEnded] = useState(false);	

  const { loading, error, getAllComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset);
    window.addEventListener("scroll", autoButtonByScroll);
    return () => window.removeEventListener("scroll", autoButtonByScroll);
  }, []);

  useEffect(() => {
    return () => {
      onRequest(offset);
    };
  }, []);

  useEffect(() => {
    if (pageEnded) {
      onRequest(offset);
    }
  }, [pageEnded]);

  const autoButtonByScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 5
    ) {
      setNewItemLoading(true);
      setPageEnded(true);
    }
  };

  const onRequest = (offset) => {
    getAllComics(offset)
      .then(onComicsLoaded)
      .finally(() => {
        setNewItemLoading(false);
        setPageEnded(false);
      });
  };

  const onComicsLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 8);
    setComicsEnded((comicsEnded) => ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("comics__item_selected")
    );		
    itemRefs.current[id].classList.add("comics__item_selected");				
  };

  function allComics(arr) {
    const elements = arr.map((item, index) => {
      return (
        <motion.li
          className="comics__item"
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 1}}
          key={index}
          tabIndex={0}
          ref={(el) => (itemRefs.current[index] = el)}
          onClick={() => focusOnItem(index)}
          onKeyUp={(e) => {
            if (e.key === " " || e.key === "Enter") {
              focusOnItem(index);
            }
          }}
        >
          <Link to={`/comics/${item.id}`}>
            <img
              className="comics__img"
              src={item.thumbnail}
              alt={item.title}
            />
            <div className="comics__name">{item.title}</div>
            <div className="comics__price">{item.price}$</div>
          </Link>
        </motion.li>
      );
    });
    return <ul className="comics__grid">{elements}</ul>;
  }

  const items = allComics(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ display: comicsEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
