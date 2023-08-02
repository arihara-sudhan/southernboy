import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import nxtprv from '../static/nxtprv.png';
import loaf from '../static/loaf.gif';
import { useParams, useNavigate } from 'react-router-dom';
import '../static/posts.css';

export default function Posts() {
  const { id } = useParams();
  const TOTALTOPS = 5;
  const [posts, setPosts] = useState([]);
  const [which, setWhich] = useState(parseInt(id, 10) || 0);
  const [set, setSet] = useState([0, TOTALTOPS - 1]);
  const [showPosts, setShowPosts] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch posts on component mount
  useEffect(() => {
    axios.get('https://arisblog.onrender.com/getPosts/').then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  // Memoized function to load the content of the current post
  const currentPost = useMemo(() => {
    if (posts.length === 0) return null;
    return posts[which].feeds[1];
  }, [which, posts]);

  // Function to navigate to a specific post
  const navigateToPost = useCallback(
    (index) => {
      setWhich(index);
      navigate(`/${index}`);
      setShowPosts(false);
    },
    [navigate]
  );

  // Function to navigate to the previous set of posts
  const navigateToPrevSet = useCallback(() => {
    if (set[0] - TOTALTOPS >= 0 && set[0] - 1 >= 0) {
      setSet([set[0] - TOTALTOPS, set[0] - 1]);
    }
  }, [set, TOTALTOPS]);

  // Function to navigate to the next set of posts
  const navigateToNextSet = useCallback(() => {
    if (set[1] + 1 < posts.length) {
      setSet([set[0] + 1, set[1] + 1]);
    }
  }, [set, posts.length]);

  // Function to toggle showing all posts
  const toggleShowPosts = useCallback(() => {
    setShowPosts((prevState) => !prevState);
  }, []);

  // Prevent drag event handler
  const preventDragHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  // Prevent context menu event handler
  const preventContextMenuHandler = useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div className='blog-all'>
      <div className='topics'>
        <img
          src={nxtprv}
          alt=''
          style={{ border: 0, borderRadius: 0 }}
          id='prvbut'
          onClick={navigateToPrevSet}
        />
        {/* Render post logos */}
        {posts.slice(set[0], set[1] + 1).map((post) => (
          <img
            key={post.num}
            src={post.logo}
            alt=''
            onClick={() => navigateToPost(post.num)}
            title={post.topic}
            onDragStart={preventDragHandler}
            onContextMenu={preventContextMenuHandler}
          />
        ))}
        <img
          id='nxtbut'
          src={nxtprv}
          alt=''
          style={{ border: 0, borderRadius: 0 }}
          onClick={navigateToNextSet}
        />
      </div>
      <button id='allpostsbutton' onClick={toggleShowPosts}>
        All Posts
      </button>
      <div className='content'>
        {showPosts ? (
          // Show all posts
          <div className='allposts'>
            {posts.map((post) => (
              <span key={post.num} onClick={() => navigateToPost(post.num)}>
                ► {post.title}
              </span>
            ))}
          </div>
        ) : (
          // Show the current post
          <div className='post'>
            {loading ? (
              // Show loading indicator
              <div className='loader-container'>
                <img src={loaf} alt='Loading' className='loader' />
              </div>
            ) : (
              // Show the post content
              <>
                {currentPost ? (
                  <>
                    <h3 id='title'>
                      {posts[which].title}
                      <span id='date'>{posts[which].feeds[0]}</span>
                    </h3>
                    <div
                      className='html'
                      dangerouslySetInnerHTML={{ __html: currentPost }}
                      onDragStart={preventDragHandler}
                      onContextMenu={preventContextMenuHandler}
                    />
                  </>
                ) : (
                  // Show a message if the post content is not loaded yet
                  <p>Loading post content...</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
