import Head from 'next/head';
import { useEffect } from 'react';
import axios from 'axios';
import Error from 'next/error';
import Link from 'next/link';

function Home({ data, error }) {
  // useEffect(() => {
  // let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
  // axios
  //   .get(url + '?key=bca7ecfb6973dec2acd4de31da407b58&targetDt=20200104')
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => console.log(err));
  // }, []);
  // console.log(data);
  // console.log(data.boxOfficeResult.dailyBoxOfficeList);

  if (error) {
    return <Error />;
  }

  if (data.faultInfo) {
    return <p>{data.faultInfo.message}</p>;
  }

  return (
    <div>
      <Head>
        <title>Box Office</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>박스오피스</h1>
      <h2>{data.boxOfficeResult.boxofficeType}</h2>
      <p>
        <time>{data.boxOfficeResult.showRange}</time>
      </p>
      <ol>
        {data.boxOfficeResult.dailyBoxOfficeList.map((item) => (
          <li key={item.movieCd}>
            <Link href='/movies/[code]' as={`/movies/${item.movieCd}`}>
              <a>
                [{item.rank}]{item.movieNm} <time>({item.openDt})</time>
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

Home.getInitialProps = async function () {
  console.log(process.env.KEY);
  let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
  try {
    const response = await axios.get(url + `?key=${process.env.KEY}&targetDt=20200104`);
    // console.log(response);
    return {
      data: response.data,
    };
  } catch (error) {
    console.warn(error);
    return { error };
  }
};

export default Home;
