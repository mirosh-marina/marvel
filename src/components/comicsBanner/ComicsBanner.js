import '../comicsBanner/comicsBanner.scss';
import avengersFoto from '../../resources/img/Avengers.png'
import avengersLogo from '../../resources/img/Avengers_logo.png'

const ComicsBanner = () => {
	return (
		<div className="comics__banner">
				<img src={avengersFoto} alt="img avengers" className="comics__banner-img"/>
				<div className="comics__banner__info">New comics every week!<br/>Stay tuned!</div>
				<img src={avengersLogo} alt="avengers logo" className="comics__banner-logo"/>
			</div>
	)
}

export default ComicsBanner