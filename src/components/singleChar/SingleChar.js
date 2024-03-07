import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../singleChar/singleChar.scss";
import "../singleComics/singleComics.scss";

const SingleChar = (props) => {
  const { name, descForSinglePage, thumbnail } = props.charFinded.charFinded;
  console.log(name);
  return (
    <motion.div
      className="single-comics"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Helmet>
        <meta name="description" content={`${name} description`} />
        <title>{name} description</title>
      </Helmet>

      <div className="wrapper__img">
        <img
          id="find__img"
          className="single-comics__img"
          src={thumbnail}
          alt={name}
        />
      </div>

      <div className="single-comics__info">
        <div className="single-comics__info__title">{name}</div>
        <div className="single-comics__info__desc">{descForSinglePage}</div>
      </div>
      <Link to={"/"} className="single-comics__info__backlink">
        Back to all chars
      </Link>
    </motion.div>
  );
};

export default SingleChar;
