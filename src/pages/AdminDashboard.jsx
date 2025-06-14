import React, { useState, useEffect, memo, Suspense } from 'react';
import styles from '../styles/AdminDashboard.module.css';

const initialPosts = [
  // ... unchanged initialPosts
];

const AdminDashboard = () => {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : initialPosts;
  });

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    summary: '',
    content: '',
    image: '',
    video: '',
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => localStorage.setItem('posts', JSON.stringify(posts)), [posts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    if (formData.id === null) {
      const newPost = {
        ...formData,
        id: Date.now(),
        published: false,
      };
      setPosts(prev => [...prev, newPost]);
    } else {
      setPosts(prev =>
        prev.map(post =>
          post.id === formData.id ? { ...formData, published: post.published } : post
        )
      );
    }

    setFormData({ id: null, title: '', summary: '', content: '', image: '', video: '' });
  };

  const handleEdit = (post) => setFormData(post);
  const handleDelete = (id) => setPosts(prev => prev.filter(p => p.id !== id));
  const togglePublish = (id) => setPosts(prev => prev.map(p => p.id === id ? { ...p, published: !p.published } : p));

  const bulkToggle = () => {
    const allPublished = posts.every((p) => p.published);
    setPosts((prev) => prev.map((p) => ({ ...p, published: !allPublished })));
  };

  const exportPosts = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(posts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'posts.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const importPosts = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setPosts(imported);
        } else {
          alert('Invalid file format');
        }
      } catch (err) {
        alert('Error parsing file');
      }
    };
    reader.readAsText(file);
  };

  const filteredPosts =
    filter === 'published'
      ? posts.filter((p) => p.published)
      : filter === 'unpublished'
      ? posts.filter((p) => !p.published)
      : posts;

  return (
    <Suspense fallback={<div>Loading Admin Dashboard...</div>}>
      <MemoizedCore
        posts={filteredPosts}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        togglePublish={togglePublish}
        bulkToggle={bulkToggle}
        setFilter={setFilter}
        currentFilter={filter}
        exportPosts={exportPosts}
        importPosts={importPosts}
      />
    </Suspense>
  );
};

const MemoizedCore = memo(({
  posts,
  formData,
  handleChange,
  handleSubmit,
  handleEdit,
  handleDelete,
  togglePublish,
  bulkToggle,
  setFilter,
  currentFilter,
  exportPosts,
  importPosts
}) => (
  <div className={styles.dashboard}>
    <h2>Admin Dashboard</h2>
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange} />
      <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
      <input name="video" placeholder="Video URL (optional)" value={formData.video} onChange={handleChange} />
      <textarea name="content" rows="4" placeholder="Content" value={formData.content} onChange={handleChange} required />
      <button type="submit">{formData.id === null ? 'Create' : 'Update'} Post</button>
    </form>
    <div className={styles.controls}>
      <button onClick={() => setFilter('all')} className={currentFilter === 'all' ? styles.active : ''}>All</button>
      <button onClick={() => setFilter('published')} className={currentFilter === 'published' ? styles.active : ''}>Published</button>
      <button onClick={() => setFilter('unpublished')} className={currentFilter === 'unpublished' ? styles.active : ''}>Unpublished</button>
      <button onClick={bulkToggle}>Toggle All</button>
      <button onClick={exportPosts}>Export</button>
      <label className={styles.importLabel}>
        Import
        <input type="file" accept="application/json" onChange={importPosts} hidden />
      </label>
    </div>
    <div className={styles.posts}>
      {posts.map((post) => (
        <div key={post.id} className={styles.postCard}>
          <img src={post.image} alt={post.title} className={styles.image} />
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
          <a href={`/post/${post.id}`} target="_blank" rel="noopener noreferrer">Preview</a>
          <div className={styles.buttons}>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
            <button
              onClick={() => togglePublish(post.id)}
              className={`${styles.toggleBtn} ${post.published ? styles.published : styles.unpublished}`}
            >
              {post.published ? 'Unpublish' : 'Publish'}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
));

export default AdminDashboard;
