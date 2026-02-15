'use client';

import React, { useState, useEffect } from 'react';
import Article, { ArticleData } from './article';
import articlesData from './data.json';
import NavBar from '../components/nav-bar/nav-bar';
import './news.css';

const Page: React.FC = () => {
  // Import article data from JSON file
  const articles: ArticleData[] = articlesData.articles;
  
  // State to track which article is being viewed
  const [selectedArticle, setSelectedArticle] = useState<ArticleData | null>(null);

  // Separate articles by category
  const featuredArticle = articles.find(article => article.featured) || articles[0];
  const hackathonArticles = articles.filter(article => article.category === 'Hackathon');
  const regularArticles = articles.filter(
    article => !article.featured && article.category !== 'Hackathon'
  );

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.articleId) {
        const article = articles.find(a => a.id === event.state.articleId);
        setSelectedArticle(article || null);
      } else {
        setSelectedArticle(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles]);

  // Function to handle article click
  const handleArticleClick = (article: ArticleData) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add to browser history
    window.history.pushState(
      { articleId: article.id },
      '',
      `#article/${article.id}`
    );
  };

  // Function to go back to the main page
  const handleBackToHome = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser history
    window.history.pushState({}, '', '#');
  };

  // If an article is selected, show the full article view
  if (selectedArticle) {
    return (
      <div className="main-container article-view">
        {/* Full Article View */}
        <Article data={selectedArticle} variant="full" />
        
        {/* Back to Home Button */}
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem 4rem' }}>
          <button 
            onClick={handleBackToHome}
            style={{
              background: 'var(--gradient-gold)',
              color: 'var(--bg-primary)',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            ← Back to All Articles
          </button>
        </div>
      </div>
    );
  }

  // Otherwise, show the main page with article grid
  return (
    <div className="main-container">
      <NavBar />

      {/* Featured Article - Compact */}
      <section className="featured-grid">
        <Article 
          data={featuredArticle} 
          variant="featured"
          onClick={() => handleArticleClick(featuredArticle)}
        />
      </section>

      {/* Hackathon News Section - Horizontal Scroll */}
      {hackathonArticles.length > 0 && (
        <>
          <div className="section-header">
            <h2 className="section-title">Hackathon</h2>
          </div>
          
          <section className="horizontal-scroll-section">
            <div className="horizontal-scroll-container">
              {hackathonArticles.map(article => (
                <div key={article.id} className="horizontal-scroll-card">
                  <Article 
                    data={article} 
                    variant="card"
                    onClick={() => handleArticleClick(article)}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Section Header for Latest Stories */}
      <div className="section-header">
        <h2 className="section-title">Latest Stories</h2>
      </div>

      {/* Articles Grid */}
      <section className="articles-grid">
        {regularArticles.map(article => (
          <Article 
            key={article.id} 
            data={article} 
            variant="card"
            onClick={() => handleArticleClick(article)}
          />
        ))}
      </section>

      {/* Example of Full Article View (commented out) */}
      {/* 
      <Article data={featuredArticle} variant="full" />
      */}
    </div>
  );
};

export default Page;