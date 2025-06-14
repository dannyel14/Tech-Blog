import React, { useState, useEffect } from 'react';
import styles from './styles/PostForm.module.css';

const PostForm = ({ onSubmit, editingPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onSubmit({ title, content, id: editingPost?.id || null });
    setTitle('');
    setContent('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{editingPost ? 'Edit Post' : 'Create Post'}</h2>
      <input type="text" placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Post content" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">{editingPost ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default PostForm;
