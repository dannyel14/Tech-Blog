import React from 'react';
import styles from './styles/PostList.module.css';
import PostItem from './PostItem';

const PostList = ({ posts, onEdit, onDelete }) => (
  <div className={styles.list}>
    <h2>All Posts</h2>
    {posts.map(post => (
      <PostItem key={post.id} post={post} onEdit={() => onEdit(post)} onDelete={() => onDelete(post.id)} />
    ))}
  </div>
);

export default PostList;
