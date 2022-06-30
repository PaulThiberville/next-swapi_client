export default function Review({ review }) {
  return (
    <>
      <p>
        <strong>Comment: </strong>
        {review.comment}
      </p>
      <p>
        <strong>Rating: </strong>
        {review.rating}
      </p>
    </>
  );
}
