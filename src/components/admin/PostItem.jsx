import React from 'react';
import styles from './styles/PostItem.module.css';

const PostItem = ({ post, onEdit, onDelete }) => (
  <div className={styles.item}>
    <h3>{post.title}</h3>
    <p>{post.content}</p>
    <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  </div>
);

export default PostItem;
