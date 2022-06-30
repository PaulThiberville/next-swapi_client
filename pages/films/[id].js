import Layout from "../../components/layout";
import { getAllFilmsIds, getFilmData } from "../../lib/films";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/date";
import React, { useEffect, useState } from "react";
import Review from "../../components/Review";

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
  const [reviews, setReviews] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const localReviews = JSON.parse(localStorage.getItem("reviews"));
    if (localReviews) {
      setReviews(localReviews);
    } else {
      localStorage.setItem("reviews", JSON.stringify([]));
      setReviews([]);
    }
  }, []);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (comment && rating) {
      setReviews([...reviews, { id: reviews.length, comment, rating }]);
      setComment("");
      setRating("");
      localStorage.setItem("reviews", JSON.stringify(reviews));
    }
  };

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
      <form className={utilStyles.form}>
        <h2>{"Add a Review"}</h2>
        <div className={utilStyles.horizontalContainer}>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className={utilStyles.textArea}
            rows="5"
          ></textarea>
          <select
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            className={utilStyles.select}
          >
            <option value="">rate</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button onClick={(e) => handleAddReview(e)}>Add Review</button>
      </form>
      {reviews?.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Layout>
  );
}
