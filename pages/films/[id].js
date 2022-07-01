import Layout from "../../components/layout";
import { getAllFilmsIds, getFilmData } from "../../lib/films";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/date";
import React, { useEffect, useState } from "react";
import Review from "../../components/Review";
import { supabase } from "../../utils/supabaseClient";

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
  const [name, setName] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      let { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("episode_id", filmData.episode_id);
      if (data) {
        console.log("reviews : ", data);
        setReviews(data);
      }
      if (error) {
        console.log("Error : ", error);
      }
    };
    getReviews();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (comment && rating && name) {
      const { data, error } = await supabase.from("reviews").insert([
        {
          name: name,
          episode_id: filmData.episode_id,
          comment: comment,
          rating: rating,
        },
      ]);
      if (data) {
        console.log(data[0]);
      }
      if (error) {
        console.log(error);
      }
      setReviews([...reviews, data[0]]);
      setComment("");
      setRating("");
      setName("");
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
      <h2>{"Add a Review"}</h2>
      <form className={utilStyles.form}>
        <div>
          <div className={utilStyles.horizontalContainer}>
            <h3>Your name :</h3>
            <input
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <h3>Your rate :</h3>
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
          <h3>Your comment :</h3>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className={utilStyles.textArea}
            rows="5"
          ></textarea>
        </div>
        <button onClick={(e) => handleAddReview(e)}>Add Review</button>
      </form>
      <h2>All Reviews</h2>
      {reviews?.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </Layout>
  );
}
