import React, { useEffect, useRef } from 'react';
import './news.css';

export interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

interface ArticleProps {
  data: ArticleData;
  variant?: 'card' | 'full' | 'featured';
  onClick?: () => void;
}

const Article: React.FC<ArticleProps> = ({ data, variant = 'card', onClick }) => {
  const { title, excerpt, content, category, author, date, imageUrl, featured } = data;
  const heroRef = useRef<HTMLDivElement | any>(null);

  // Add scroll effect for full article page
  useEffect(() => {
    if (variant === 'full' && heroRef.current) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const heroElement = heroRef.current;
        
        if (heroElement) {
          // Calculate opacity and blur based on scroll
          const maxScroll = 400;
          const scrollRatio = Math.min(scrollPosition / maxScroll, 1);
          
          // Keep opacity between 0.3 and 1.0 (more visible when scrolled)
          const opacity = 1 - (scrollRatio * 0.7);
          // Moderate blur up to 8px
          const blur = scrollRatio * 8;
          // Gradually darken more as you scroll
          const brightness = 0.5 - (scrollRatio * 0.2);
          
          heroElement.style.opacity = opacity.toString();
          heroElement.style.filter = `blur(${blur}px) brightness(${brightness})`;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [variant]);

  // Card variant (for grid display)
  if (variant === 'card') {
    return (
      <article 
        className="article-card fade-in-up shine-effect"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={imageUrl} 
          alt={title}
          className="article-image"
        />
        <div className="article-content">
          <div className="article-meta">
            <span className="article-category">{category}</span>
          </div>
          <h3 className="article-title">{title}</h3>
          <p className="article-excerpt">{excerpt}</p>
          <span className="read-more">
            Read More →
          </span>
        </div>
      </article>
    );
  }

  // Featured variant (for hero display)
  if (variant === 'featured') {
    return (
      <article 
        className="featured-article fade-in-up"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={imageUrl} 
          alt={title}
          className="article-image"
        />
        <div className="featured-overlay">
          <div className="article-meta">
            <span className="article-category">{category}</span>
          </div>
          <h2 className="article-title">{title}</h2>
          <p className="article-excerpt">{excerpt}</p>
        </div>
      </article>
    );
  }

  // Full article variant (for article page)
  return (
    <article className="article-page">
      {/* Full-width hero image with overlay */}
      <div className="article-hero">
        <img 
          ref={heroRef}
          src={imageUrl} 
          alt={title}
          className="article-hero-image"
        />
        <div className="article-hero-overlay">
          <div className="article-hero-content">
            <h1 className="article-hero-title">{title}</h1>
            <div className="article-hero-meta">
              <span className="article-author">By {author}</span>
              <span className="article-hero-divider">•</span>
              <span className="article-date">{date}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="article-body-container">
        <div className="article-body">
          {content.split('\n\n').map((paragraph, index) => {
            // Simple parsing for different content types
            if (paragraph.startsWith('## ')) {
              return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
              return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('> ')) {
              return <blockquote key={index}>{paragraph.replace('> ', '')}</blockquote>;
            }
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>
    </article>
  );
};

export default Article;