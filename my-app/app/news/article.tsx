import React from 'react';
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
            <span className="article-date">{date}</span>
          </div>
          <h3 className="article-title">{title}</h3>
          <p className="article-excerpt">{excerpt}</p>
          <span className="article-author">By {author}</span>
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
            <span className="article-date">{date}</span>
          </div>
          <h2 className="article-title">{title}</h2>
          <p className="article-excerpt">{excerpt}</p>
          <span className="article-author">By {author}</span>
        </div>
      </article>
    );
  }

  // Full article variant (for article page)
  return (
    <article className="article-page">
      <header className="article-header">
        <span className="article-category gradient-text">{category}</span>
        <h1 className="article-title">{title}</h1>
        <div className="article-meta">
          <span className="article-author">By {author}</span>
          <span className="article-date">{date}</span>
        </div>
      </header>
      
      <img 
        src={imageUrl} 
        alt={title}
        className="article-image"
      />
      
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
    </article>
  );
};

export default Article;