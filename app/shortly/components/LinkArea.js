"use client";
import { useState } from 'react';

const LinkArea = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const generatedShortUrl = generateShortUrl();

      const response = await fetch("https://nkmvhnwulrqvvmnzfmdz.supabase.co/rest/v1/urls", {
        method: "POST",
        headers: {
          "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rbXZobnd1bHJxdnZtbnpmbWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MDI2NjAsImV4cCI6MjA0MzM3ODY2MH0.57lDrq8eEdkSO_CpN-rSacX6j_cljo2_RA_tlp00Jl0",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rbXZobnd1bHJxdnZtbnpmbWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4MDI2NjAsImV4cCI6MjA0MzM3ODY2MH0.57lDrq8eEdkSO_CpN-rSacX6j_cljo2_RA_tlp00Jl0",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          long_url: longUrl,
          short_url: generatedShortUrl
        })
      });

      if (response.ok) {
        setShortUrl(generatedShortUrl);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Short URL oluşturulamadı');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  return (
    <div className="linkArea">
      <form id="link-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="link-input"
          placeholder="Shorten a link here..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten It!</button>
      </form>

      {shortUrl && (
        <div id="shortened-link">
          <p className='longurl'>{longUrl}</p>
          <a id="shortened-url" href={`/shortly/${shortUrl}`} target="_blank">
            {`${window.location.origin}/shortly/${shortUrl}`}
          </a>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LinkArea;
