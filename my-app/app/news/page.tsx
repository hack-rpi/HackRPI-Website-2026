'use client';

import React, { useState } from 'react';
import Article, { ArticleData } from './article';
import articlesData from './data.json';
import './news.css';
import NavBar from '../components/nav-bar/nav-bar';
import Footer from "@/app/components/footer/footer";

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

  // Function to handle article click
  const handleArticleClick = (article: ArticleData) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to go back to the main page
  const handleBackToHome = () => {
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If an article is selected, show the full article view
  if (selectedArticle) {
    return (
      <div className="main-container">
        {/* Header with back button */}
        <header className="header">
          <div className="header-content">
            <h1 className="logo" onClick={handleBackToHome} style={{ cursor: 'pointer' }}>
              TechVista
            </h1>
            <p className="tagline">The Future, Today</p>
          </div>
        </header>

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
      {/* Header */}
      {/* <header className="header">
        <div className="header-content">
          <h1 className="logo">TechVista</h1>
          <p className="tagline">The Future, Today</p>
        </div>
      </header>
      keeping header for reference for our header? - Steven */}
      <NavBar />

      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="hero-title">
          Discover Tomorrow's Technology
        </h2>
        <p className="hero-subtitle">
          In-depth coverage of the innovations shaping our digital future
        </p>
      </section>

      {/* Featured Article */}
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
            <h2 className="section-title">Hackathon News</h2>
            <p className="section-subtitle">Everything you need to know about our upcoming events</p>
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
        <p className="section-subtitle">Stay ahead with cutting-edge tech insights</p>
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

      <div className="p-5 bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default Page;