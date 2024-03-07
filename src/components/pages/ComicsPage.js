import { Helmet } from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import ComicsBanner from "../comicsBanner/ComicsBanner";


const ComicsPage = () => {
  return (
    <>
		<Helmet>
		<meta 
						name="description" 
						content="Page with list of our comics" 
						/>
						<title>Comics page</title>
		</Helmet>
      <ComicsBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
