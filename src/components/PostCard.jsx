// src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/PostCard.module.css';

const truncate = (text, wordLimit = 20) => {
  const words = text.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
};

const PostCard = ({ post }) => {
  return (
    <div className={styles.card}>
      {post.image && (
        <img src={post.image} alt={post.title} className={styles.media} />
      )}

      {!post.image && post.video && (
        <video className={styles.media} muted autoPlay loop playsInline>
          <source src={post.video} type="video/mp4" />
        </video>
      )}

      <div className={styles.textContent}>
        <h3>{post.title}</h3>
        <p>{truncate(post.summary)}</p>
        <Link to={`/post/${post.id}`} className={styles.readMore}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
