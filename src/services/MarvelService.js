import { useHttp } from "../components/hooks/http.hook";

const useMarvelService = () => {
  // Использовали раньше, перед созданием нашего собственного хука

  // getResource = async (url) => {
  // 	try {
  // 		let res = await fetch(url);
  // 		if (!res.ok) {
  // 			if (res.status === 404) {
  // 				throw new Error(`Resource not found: ${url}`);
  // 			} else {
  // 			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  // 		}}
  // 			return await res.json();
  // 	} catch (error) {
  // 		console.error(error.message);
  // 		throw error;
  // 	}
  // };

  const { request, cleanError, process, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey2 = "apikey=5e2f50af05b94fe0fac2af8c17500352";
  const _apiKey1 = "apikey=08ed76ee595a93e64921a270464a32f0";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey2}`
    );		

    return res.data.results.map(
      _transformCharacter);
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey2}`
    );
    return res.data.results.map(_transformComics);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey2}`);    

    return _transformCharacter(res.data.results[0]);
  };

	const findCharacter = async (name) => {			
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey2}`)
		
		return _transformCharacter(res.data.results[0]);
	}

  const getComics = async (id) => {
    const res = await request(
      `${_apiBase}comics/${id}?${_apiKey2}`
    );
		
    return _transformComics(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    const findUnknownImgOne = char.thumbnail.path.includes("not_available");
    const findUnknownImgTwo = char.thumbnail.path.includes("4c002e0305708");
    return {
      id: char.id,
      name: char.name,
      description: `${
        char.description.length > 160
          ? char.description.slice(0, 160) + "..."
          : char.description
      }`,
			descForSinglePage: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      noThumbnailOne: findUnknownImgOne,
      noThumbnailTwo: findUnknownImgTwo,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items			      
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
			thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      title: comics.title,
      description: comics.description,
			price: comics.prices[0].price ? `${comics.prices[0].price}` : 'not available',
			language: comics.textObjects.language || 'en-us',
			pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages' 
    };
  };

  return {    
    getAllCharacters,
    getCharacter,
    cleanError,
		process,
		setProcess,
    getAllComics,
		getComics,
		findCharacter
  };
};

export default useMarvelService;
