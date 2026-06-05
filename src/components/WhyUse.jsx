import React, { useEffect, useRef, useState } from 'react';
import './WhyUse.css';

const features = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Fast Detection in Seconds',
    desc: 'Receive a detailed psoriasis risk assessment in under 2 seconds — no waiting, no scheduling.',
    color: '#3182CE',
    stat: '< 2s',
    statLabel: 'Response Time',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'AI-Powered Accuracy',
    desc: 'Trained on thousands of clinical skin images using ResNet-50, our model delivers 99% detection accuracy.',
    color: '#0BC5EA',
    stat: '99%',
    statLabel: 'Accuracy',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Early Skin Risk Identification',
    desc: 'Spot early signs of psoriasis before they worsen, enabling proactive and timely healthcare decisions.',
    color: '#38A169',
    stat: 'Early',
    statLabel: 'Detection',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'No Hospital Waiting Time',
    desc: 'Skip the long queues. Get a preliminary screening result instantly from the comfort of your home.',
    color: '#805AD5',
    stat: '0 min',
    statLabel: 'Wait Time',
  },
];

const WhyUse = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="why" id="about" ref={ref}>
      <div className="why__bg">
        <div className="why__bg-gradient"></div>
      </div>

      <div className="container">
        <div className="why__header">
          <div className="section-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            Core Benefits
          </div>
          <h2 className="section-title">
            Why Use <span className="text-gradient">Psoriasis AI</span>?
          </h2>
          <p className="section-subtitle">
            Designed with patients and healthcare accessibility in mind — fast, accurate, and available 24/7.
          </p>
        </div>

        <div className="why__grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`why__card ${visible ? 'why__card--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
              id={`why-card-${i + 1}`}
            >
              <div className="why__card-top">
                <div className="why__card-icon" style={{ color: f.color, background: f.color + '15' }}>
                  {f.icon}
                </div>
                <div className="why__card-stat">
                  <div className="why__card-stat-num" style={{ color: f.color }}>{f.stat}</div>
                  <div className="why__card-stat-label">{f.statLabel}</div>
                </div>
              </div>
              <h3 className="why__card-title">{f.title}</h3>
              <p className="why__card-desc">{f.desc}</p>
              <div className="why__card-bar" style={{ background: f.color + '20' }}>
                <div className="why__card-bar-fill" style={{ background: f.color }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUse;
