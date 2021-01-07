import Head from 'next/head';
import axios from 'axios';
import Error from 'next/error';
import Link from 'next/link';
import { DatePicker } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';

function Home({ data, error, targetDt }) {
  const router = useRouter();
  if (error) {
    return <Error />;
  }

  if (data.faultInfo) {
    return <p>{data.faultInfo.message}</p>;
  }

  function onChange(date, dateString) {
    // console.log(date, dateString);
    router.push(`/?targetDt=${dateString}`);
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
      <DatePicker onChange={onChange} defaultValue={moment(targetDt, 'YYYYMMDD')} format={'YYYYMMDD'} />
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

Home.getInitialProps = async function (ctx) {
  // console.log(process.env.KEY);
  let key = process.env.KEY || 'bca7ecfb6973dec2acd4de31da407b58';
  let url = 'https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
  const targetDt = ctx.query.targetDt || moment().subtract(1, 'day').format('YYYYMMDD');
  try {
    const response = await axios.get(url + `?key=${key}&targetDt=${targetDt}`);
    // console.log(targetDt);
    return {
      targetDt,
      data: response.data,
    };
  } catch (error) {
    console.warn(error);
    return { error };
  }
};

export default Home;
