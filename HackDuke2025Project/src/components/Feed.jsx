import { useState } from 'react';
import './Feed.css';

const Feed = () => {
  // Mock data for posts - in a real app this would come from an API
  const [posts] = useState([
    {
      id: 1,
      companyName: "EcoTech Solutions",
      logo: "https://via.placeholder.com/150",
      timestamp: "2h ago",
      content: "We're excited to announce our latest milestone: reducing carbon emissions by 50% for our clients!",
      likes: 234,
      comments: 45
    },
    {
      id: 2,
      companyName: "HealthAI Innovations",
      logo: "https://via.placeholder.com/150",
      timestamp: "5h ago",
      content: "Just closed our Series A funding round! Thanks to all our investors for believing in our mission to revolutionize healthcare.",
      likes: 567,
      comments: 89
    },
    {
      id: 3,
      companyName: "FinTech Forward",
      logo: "https://via.placeholder.com/150",
      timestamp: "1d ago",
      content: "Launching our new mobile payment solution next week! Stay tuned for the big reveal.",
      likes: 342,
      comments: 67
    }
  ]);

  return (
    <div className="feed-container">
      <div className="feed-header">
        <h1>Your Investment Feed</h1>
        <p>Stay updated with your portfolio companies</p>
      </div>

      <div className="posts-container">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="company-info">
                <img src={post.logo} alt={post.companyName} className="company-logo" />
                <div>
                  <h3>{post.companyName}</h3>
                  <span className="timestamp">{post.timestamp}</span>
                </div>
              </div>
            </div>
            
            <div className="post-content">
              <p>{post.content}</p>
            </div>

            <div className="post-actions">
              <button className="action-button">
                <i className="far fa-heart"></i>
                {post.likes}
              </button>
              <button className="action-button">
                <i className="far fa-comment"></i>
                {post.comments}
              </button>
              <button className="action-button">
                <i className="far fa-share-square"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
