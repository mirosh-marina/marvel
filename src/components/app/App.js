import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, Page404, SingleComicsPage } from "../pages";


const App = () => { 
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <Switch>
          <Route exact path="/">
            <main>
              <MainPage />
            </main>
          </Route>
          <Route exact path="/comics">
            <ComicsPage />
          </Route>
          <Route exact path="/comics/:comicsId">
            <SingleComicsPage />
          </Route>
					<Route path="*">
						<Page404 />
					</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
