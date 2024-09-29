import React, { useState } from 'react';
import axios from 'axios';

const PageEditor = ({ initialContent }) => {
  const [title, setTitle] = useState(initialContent.title || '');
  const [slug, setSlug] = useState(initialContent.slug || '');
  const [html, setHtml] = useState(initialContent.html || '<p>Start editing your page...</p>');
  const [css, setCss] = useState(initialContent.css || '');
  const [customData, setCustomData] = useState(initialContent.custom_data || '{}');
  const [isPublished, setIsPublished] = useState(initialContent.is_published || false);

  const savePage = async () => {
    try {
      const response = await axios.post('/save-page', {
        title,
        slug,
        html,
        css,
        custom_data: customData,
        is_published: isPublished,
      });

      alert('Page saved successfully!');
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page');
    }
  };

  return (
    <div className="editor">
      <div className="form-group">
        <label>Page Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Page Slug (URL)</label>
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
      </div>
      <div className="form-group">
        <label>HTML Content</label>
        <textarea value={html} onChange={(e) => setHtml(e.target.value)} rows="10"></textarea>
      </div>
      <div className="form-group">
        <label>CSS Content</label>
        <textarea value={css} onChange={(e) => setCss(e.target.value)} rows="5"></textarea>
      </div>
      <div className="form-group">
        <label>Custom Data (JSON)</label>
        <textarea value={customData} onChange={(e) => setCustomData(e.target.value)} rows="5"></textarea>
      </div>
      <div className="form-group">
        <label>Is Published?</label>
        <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
      </div>
      <button onClick={savePage} className="btn btn-primary">Save Page</button>
    </div>
  );
};

export default PageEditor;
