import React, { useState } from 'react';
import styles from './styles/Dashboard.module.css';
import PostForm from './PostForm';
import PostList from './PostList';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleCreate = (post) => {
    setPosts(prev => [...prev, { ...post, id: Date.now() }]);
  };

  const handleUpdate = (updatedPost) => {
    setPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
    setEditingPost(null);
  };

  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className={styles.dashboard}>
      <h1>Admin Dashboard</h1>
      <PostForm onSubmit={editingPost ? handleUpdate : handleCreate} editingPost={editingPost} />
      <PostList posts={posts} onEdit={setEditingPost} onDelete={handleDelete} />

      <button onClick={() => {
  localStorage.removeItem('isAdmin');
  window.location.href = '/admin-login';
}} style={{ float: 'right' }}>
  Logout
</button>

    </div>
  );
};

export default Dashboard;
