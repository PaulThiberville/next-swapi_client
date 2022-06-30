import Layout from "../../components/layout";
import { getAllFilmsIds, getFilmData } from "../../lib/films";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/date";

export async function getStaticProps({ params }) {
  const filmData = await getFilmData(params.id);
  return {
    props: {
      filmData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllFilmsIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Film({ filmData }) {
  return (
    <Layout>
      <Head>
        <title>{filmData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{filmData.title}</h1>
        <h2>{"Opening"}</h2>
        <p>{filmData.opening_crawl}</p>
        <h2>{"Director"}</h2>
        <p>{filmData.director}</p>
        <h2>{"Producer"}</h2>
        <p>{filmData.producer}</p>
        <h2>{"Release"}</h2>
        <Date dateString={filmData.release_date}></Date>
      </article>
    </Layout>
  );
}
