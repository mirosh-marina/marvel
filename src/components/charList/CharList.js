import "../charList/charList.scss";
import MarvelService from "../../services/MarvelService";
import React, { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

class CharList extends Component {  

  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
    window.addEventListener("scroll", this.autoButtonByScroll);    
  }

  UNSAFE_componentWillMount() {
    window.removeEventListener("scroll", this.autoButtonByScroll);
  }

  autoButtonByScroll = () => {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      this.onRequest(this.state.offset);
    }
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  itemRefs = [];

  setRef = (ref) => {
    this.itemRefs.push(ref);    
  }
  
  focusOnItem = (id) => {    
    this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    this.itemRefs[id].classList.add('char__item_selected')
  }  
  

  allChar(arr) {
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
        <li
          key={item.id}
          ref={this.setRef}
          className="char__item"
          onClick={() => {
            this.props.onCharSelected(item.id); 
            this.focusOnItem(index);           
          }}
        >
          <img style={noImg} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{elements}</ul>;
  }

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } =
      this.state;

    const items = this.allChar(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
