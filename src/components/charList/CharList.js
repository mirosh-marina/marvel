import "../charList/charList.scss";
import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  
    
    state = {
      charList: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 210,
      charEnded: false
  
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

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
    this.setState(({offset, charList}) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      // offset: offset+9
    }));
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  

  allChar(arr) {    
    const elements = arr.map((item) => {
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
          className="char__item"
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <img style={noImg} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{elements}</ul>;
  }

  render() {
    const { charList, loading, error, offset, newItemLoading } = this.state;

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
          className="button button__main button__long"
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
