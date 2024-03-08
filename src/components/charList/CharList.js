import "../charList/charList.scss";
import useMarvelService from "../../services/MarvelService";
import React, { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

const CharList = (props) => {
	
	const [charList, setCharList] = useState([]);		
	const [newItemLoading, setNewItemLoading] = useState(true);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	const [pageEnded, setPageEnded] = useState(false);


  const {loading, error, getAllCharacters} = useMarvelService();

	useEffect(() => {
		onRequest(offset, true);
		window.addEventListener("scroll", autoButtonByScroll);
		return () => window.removeEventListener("scroll", autoButtonByScroll);
	},[]); 

	// useEffect (() => {
	// 	return () => {
	// 		onRequest(offset)
	// 	}
	// }, [])

	useEffect(() => {
		if (pageEnded) {
			onRequest(offset)
		}
	}, [pageEnded])

  const autoButtonByScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {		
      setNewItemLoading(true);
			setPageEnded(true);
    }
  };

  const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);    
    
      getAllCharacters(offset)
      .then(onCharListLoaded)      
			.finally(() => {
				setNewItemLoading(false);
				setPageEnded(false)
			});			
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    
		setCharList(charList => [...charList, ...newCharList]);		
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(charEnded => ended);
  };
 

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {    
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected')
  }  
  

  function allChar(arr) {
    const elements = arr.map((item, index) => {
      let noImg = {};
      if (item.noThumbnailOne) {
        noImg = { objectFit: "contain", width: "235px" };
      } else if (item.noThumbnailTwo) {
        noImg = { objectFit: "fill" };
      } else {
        noImg = null;
      }
      return (
				
        
					<motion.li
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					transition={{duration: 1}}
          key={item.id}
          tabIndex={0}
          ref={el => itemRefs.current[index] = el}
          className="char__item"
          onClick={() => {
            props.onCharSelected(item.id); 
            focusOnItem(index);           
          }}
          onKeyUp={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              this.props.onCharSelected(item.id);
              this.focusOnItem(index);
            }
          }}
        >
          <img style={noImg} src={item.thumbnail} alt={item.name} className="char__img"/>
          <div className="char__name">{item.name}</div>
        </motion.li>
				
				
      );
    });
    return <ul className="char__grid">{elements}</ul>;
  }

    const items = allChar(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {items}
        <button
          disabled={newItemLoading}
          onClick={() => onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }


CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
