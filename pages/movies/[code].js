import axios from 'axios';
import { useRouter } from 'next/router';
import Error from 'next/error';

function MovieInfo({ movieInfo, error }) {
  const router = useRouter();
  const onHistoryBack = () => {
    router.back();
  };

  if (error) {
    return <Error statusCode={500} title={error.message} />;
  }

  return (
    <div>
      <h1>영화 정보 상세 페이지</h1>
      <div>
        <h2>{movieInfo.movieNm}</h2>
        <span>{movieInfo.movieNmEn}</span>
      </div>
      <p>
        <time>{movieInfo.openDt}</time>
      </p>

      <dl>
        <div>
          <dt>감독</dt>
          {movieInfo.directors.map((director, idx) => (
            <dd key={idx}>
              {director.peopleNm}
              {director.peopleNmEn}
            </dd>
          ))}
        </div>
        <div>
          <dt>출연</dt>
          <dd>{movieInfo.actors.map((actor, idx) => actor.peopleNm).join(', ')}</dd>
        </div>
        <div>
          <dt>장르</dt>
          <dd>{movieInfo.genres.map((genre, idx) => genre.genreNm).join(', ')}</dd>
        </div>
        <div>
          <dt>국가</dt>
          <dd>{movieInfo.nations.map((nation, idx) => nation.nationNm).join(', ')}</dd>
        </div>
      </dl>

      <button type='button' onClick={onHistoryBack}>
        back{' '}
      </button>
    </div>
  );
}
MovieInfo.getInitialProps = async function (ctx) {
  let key = process.env.KEY || 'bca7ecfb6973dec2acd4de31da407b58';
  try {
    const result = await axios.get(
      `https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${key}&movieCd=${ctx.query.code}`
    );

    return {
      movieInfo: result.data.movieInfoResult.movieInfo,
    };
  } catch (error) {
    return { error };
  }
};

export default MovieInfo;
