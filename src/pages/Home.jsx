import React, { useEffect, useState, Suspense } from 'react';
import styles from '../styles/Home.module.css';
import defaultPosts from '../data/posts.json'; // import JSON from src

const PostCard = React.lazy(() => import('../components/PostCard'));
const SearchBar = React.lazy(() => import('../components/SearchBar'));

const POSTS_PER_PAGE = 8;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const savedPosts = localStorage.getItem('posts');

    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      setPosts(parsed.filter(p => p.published));
    } else {
      // Load default posts and store in localStorage
      const publishedDefaults = defaultPosts.filter(p => p.published);
      localStorage.setItem('posts', JSON.stringify(defaultPosts));
      setPosts(publishedDefaults);
    }
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Latest Tech Posts</h1>

      <Suspense fallback={<div className={styles.loading}>Loading search...</div>}>
        <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
      </Suspense>

      <div className={styles.grid}>
        <Suspense fallback={<div className={styles.loading}>Loading posts...</div>}>
          {paginatedPosts.length ? (
            paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className={styles.noResults}>No matching posts found.</p>
          )}
        </Suspense>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={goToPrevious} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

