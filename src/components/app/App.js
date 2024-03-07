import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

// отдельно импортируем, для того чтобы импорт был default для использования lazy
const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicsPage = lazy(() => import("../pages/SingleComicsPage"));
const SingleCharPage = lazy(() => import('../pages/SingleCharPage'));




const App = () => {

	const [findedChar, setFindedChar] = useState(null);

  const onCharFinded = (char) => {
    setFindedChar(char);
  };
	
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path="/">
                <MainPage onCharFinded={onCharFinded} />
              </Route>
              <Route exact path="/comics">
                <ComicsPage />
              </Route>
              <Route exact path="/comics/:comicsId">
                <SingleComicsPage />
              </Route>
              <Route exact path="/:charId">
                <SingleCharPage charFinded={findedChar} />
              </Route>
              <Route path="*">
                <Page404 />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
