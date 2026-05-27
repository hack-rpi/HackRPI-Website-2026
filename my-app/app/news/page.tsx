'use client';

import React, { useState, useEffect } from 'react';
import Article, { ArticleData } from './article';
import articlesData from './data.json';
import NavBar from '../components/nav-bar/nav-bar';

import Lenis from 'lenis';
import Footer from '../components/footer/footer';

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

  // Core URL Routing & Back-Button Sync
  useEffect(() => {
    // 1. Function to parse current URL and match an article
    const checkUrlForArticle = () => {
      // Handles window.location.hash (e.g., #article/some-id)
      const hash = window.location.hash;
      if (hash && hash.startsWith('#article/')) {
        const idFromHash = hash.replace('#article/', '');
        const article = articles.find(a => String(a.id) === idFromHash);
        if (article) {
          setSelectedArticle(article);
          return;
        }
      }

      // Optional fallback: Checks if modern window.location.pathname matches /id directly
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length === 1) {
        const idFromPath = pathSegments[0];
        const article = articles.find(a => String(a.id) === idFromPath);
        if (article) {
          setSelectedArticle(article);
          return;
        }
      }

      // If no valid IDs are in the URL, clear state back to grid view
      setSelectedArticle(null);
    };

    // 2. Run immediately when page loads to check for incoming linked URLs
    checkUrlForArticle();

    // 3. Handle browser back/forward buttons
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.articleId) {
        const article = articles.find(a => a.id === event.state.articleId);
        setSelectedArticle(article || null);
      } else {
        // Fallback to checking the raw URL string if history state properties are empty
        checkUrlForArticle();
      }
    };

    // Lenis scrolling integration
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [articles]);

  // Function to handle article click
  const handleArticleClick = (article: ArticleData) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add to browser history using Hash routing
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
    
    // Reset path back to home safely
    window.history.pushState({}, '', window.location.pathname);
  };

  // If an article is selected, show the full article view
  if (selectedArticle) {
    return (
      <>
      <NavBar showOnScroll={false} variant={1}/>
      <main className="
        min-h-screen w-full overflow-x-hidden bg-black text-white
        [background:radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.05)_0%,transparent_50%),
          radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.04)_0%,transparent_50%)] pt-[8vh]
      ">
        <Article data={selectedArticle} variant="full" />

        <div className="mx-auto max-w-225 px-8 pb-16">
          <button
            type="button"
            onClick={handleBackToHome}
            className="cursor-pointer rounded-lg border-0
              bg-[linear-gradient(135deg,#ffd700_0%,#ffed4e_50%,#ffd700_100%)] px-8 py-4
              text-base font-semibold text-black transition-transform duration-200
              ease-out hover:-translate-y-0.5"
          >
            ← Back to All Articles
          </button>
        </div>
      </main>
      <footer className="bg-gray-800">
        <div className="w-full h-[10vh] bg-black" style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }} id="footer-ellipse"></div>
        <Footer/>
      </footer>
      </>
    );
  }

  // Otherwise, show the main page with article grid
  return (
    <>
    <NavBar showOnScroll={false} variant={1}/>
    <main className="
      min-h-screen w-full overflow-x-hidden bg-black font-sans
      leading-relaxed text-white bg-linear-to-b from-blue-800 to-black to-10%
      [background:radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.05)_0%,transparent_50%),
        radial-gradient(ellipse_at_bottom_left,rgba(255,215,0,0.04)_0%,transparent_50%)] pb-15
    ">
      <section className="mx-auto grid max-w-400 grid-cols-1 gap-12 px-12 pb-10 pt-25 max-md:px-6 max-md:pt-8">
        <Article 
          data={featuredArticle} 
          variant="featured"
          onClick={() => handleArticleClick(featuredArticle)}
        />
      </section>

      {/* Hackathon News Section */}
      {hackathonArticles.length > 0 && (
        <>
          <div className="mx-auto max-w-400 px-12 pb-8 pt-8 max-md:px-6">
            <h2 className="bg-linear-to-r from-white to-gold bg-clip-text text-[1.75rem] font-bold tracking-tight text-transparent max-md:text-2xl">
              Hackathon
            </h2>
          </div>

          <section className="mx-auto max-w-400 overflow-visible px-12 pb-12 max-md:px-6">
            <div className="
                -my-8 flex snap-x snap-mandatory gap-8 overflow-x-auto overflow-y-visible py-8 pb-12 scroll-pl-12
                [scrollbar-color:#ffd700_#0d0d0d] [scrollbar-width:thin] max-md:scroll-pl-6 [&::-webkit-scrollbar]:h-2.5 
                ...
              ">
              {hackathonArticles.map((article) => (
                <div key={article.id} className="w-65 min-w-65 max-w-65 shrink-0 snap-start max-md:w-60 max-md:min-w-60 max-md:max-w-60">
                  <Article data={article} variant="card" scrollCard onClick={() => handleArticleClick(article)} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Latest Stories Section */}
      <div className="mx-auto max-w-400 px-12 pb-8 pt-12 max-md:px-6">
        <h2 className="bg-linear-to-r from-white to-gold bg-clip-text text-[1.75rem] font-bold tracking-tight text-transparent max-md:text-2xl">
          Latest Stories
        </h2>
      </div>

      <section className="mx-auto grid max-w-400 grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 p-12 max-md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-md:gap-5 max-md:px-6 max-md:py-12">
        {regularArticles.map(article => (
          <Article key={article.id} data={article} variant="card" onClick={() => handleArticleClick(article)} />
        ))}
      </section>
    </main>
    <footer className="bg-gray-800">
      <div className="w-full h-[10vh] bg-black" style={{ clipPath: "ellipse(70% 0% at 50% 0%)" }} id="footer-ellipse"></div>
      <Footer/>
    </footer>
    </>
  );
};

export default Page;