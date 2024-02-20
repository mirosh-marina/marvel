import "../charList/charList.scss";
import MarvelService from "../../services/MarvelService";
import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charList: [],
      loading: true,
      error: false,
      nineChar: 210
    };
  }

  marvelService = new MarvelService();

  async componentDidMount() {    
    this.marvelService.getAllCharacters(this.state.nineChar)
        .then(this.onCharListLoaded)
        .catch(this.onError)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.nineChar !== prevState.nineChar) {
      this.setState({loading: true});
      this.marvelService.getAllCharacters(this.state.nineChar)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }
  }

  onCharListLoaded = (charList) => {
    this.setState({charList, loading: false})
  }

  onError = () => {
    this.setState({error: true, loading: false})
  }

  onNextNine = () => {
    this.setState({nineChar: this.state.nineChar + 9})
  }

  

  allChar (arr) {
    

    const elements = arr.map((item) => {
      let noImg = {};
      if(item.noThumbnailOne) {
      noImg = {objectFit: 'contain', width: '235px'}
      } else if (item.noThumbnailTwo) {
        noImg = {objectFit: 'fill'}
      } else {
        noImg = null;
      }      
      return (
        <li key={item.id} className="char__item" onClick={() => this.props.onCharSelected(item.id)}>
          <img style={noImg} src={item.thumbnail} alt={item.name} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return (
      <ul className="char__grid">{elements}</ul>
    )
  };



  render() {

    const {charList, loading, error} = this.state;

    const items = this.allChar(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null; 

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button onClick={() => this.onNextNine()} className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
