import styles from "./review.module.css";

export default function Review({ review }) {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>{review.name}</h3>
        <p>{review.rating}/5</p>
      </div>
      <p className={styles.content}>{review.comment}</p>
    </div>
  );
}
