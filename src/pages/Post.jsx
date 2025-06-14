import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from '../styles/Post.module.css';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const allPosts = JSON.parse(storedPosts);
      const foundPost = allPosts.find(p => String(p.id) === id && p.published);
      setPost(foundPost);
    }
  }, [id]);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h2>Post not found</h2>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.post}>
      <h1 className={styles.title}>{post.title}</h1>

      {post.image && (
        <img src={post.image} alt={post.title} className={styles.media} />
      )}

      {post.video && (
        <div className={styles.videoWrapper}>
          <iframe
            src={post.video}
            title={post.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <p className={styles.content}>{post.content}</p>
      <Link to="/" className={styles.backLink}>← Back to Home</Link>
    </div>
  );
};

export default Post;
