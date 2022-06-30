export default function Review({ review }) {
  return (
    <>
      <h2>{review.name}</h2>
      <p>{review.comment}</p>
      <p>
        <strong>Rating: </strong>
        {review.rating}
      </p>
    </>
  );
}
