import { useState } from "react";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import CustomForm from "../form/Form";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainPage = (props) => {

  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <div className="char__content__big">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
        </div>
        <div className="char__content__small">
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
					<CustomForm onCharFinded={props.onCharFinded}/>
        </div>
      </div>
      
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
