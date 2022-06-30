import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getFilmsData } from "../lib/films";
import Link from "next/link";

export async function getStaticProps() {
  const allFilmsData = await getFilmsData();
  return {
    props: {
      allFilmsData,
    },
  };
}

export default function Home({ allFilmsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Movies</h2>
        <ul className={utilStyles.list}>
          {allFilmsData.map(({ episode_id, release_date, title }) => (
            <li className={utilStyles.listItem} key={episode_id}>
              <Link href={`/films/${episode_id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
