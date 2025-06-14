// src/components/AdminPostCard.jsx
import React from 'react';
import styles from '../styles/AdminDashboard.module.css';

const AdminPostCard = ({ post, onEdit, onDelete, onTogglePublish }) => (
  <div className={styles.postCard}>
    {post.image && <img src={post.image} alt={post.title} className={styles.image} />}
    {!post.image && post.video && (
      <video className={styles.image} controls>
        <source src={post.video} type="video/mp4" />
      </video>
    )}
    <h3>{post.title}</h3>
    <p>{post.summary}</p>
    <button onClick={() => onEdit(post)}>Edit</button>
    <button onClick={() => onDelete(post.id)}>Delete</button>
    <button
      className={post.published ? styles.unpublish : styles.publish}
      onClick={() => onTogglePublish(post.id)}
    >
      {post.published ? 'Unpublish' : 'Publish'}
    </button>
  </div>
);

export default React.memo(AdminPostCard);
