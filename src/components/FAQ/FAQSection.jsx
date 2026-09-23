import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { EVENT_DATA } from '../../data/event';

export const FAQSection = () => {
  const { faqs } = EVENT_DATA;
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-on-scroll">
          <div className="section-badge">
            <HelpCircle size={14} />
            <span>CLARITY & GUIDANCE</span>
          </div>
          <h2 className="section-title">FREQUENTLY ASKED QUESTIONS</h2>
          <p className="section-subtitle">
            Everything you need to know about the ₹799 all-inclusive pass, hackathon team rules, campus venue, and event flow.
          </p>
        </div>

        {/* Accordion List */}
        <div
          className="stagger-container"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card reveal-on-scroll"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: isOpen ? '1px solid var(--border-glow)' : '1px solid rgba(255, 255, 255, 0.06)',
                  backgroundColor: isOpen ? 'rgba(16, 22, 38, 0.9)' : 'rgba(14, 16, 24, 0.65)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '22px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ color: isOpen ? 'var(--accent-cyan)' : '#ffffff' }}>
                    {faq.q}
                  </span>
                  <div
                    style={{
                      color: isOpen ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}
                  >
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px 24px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.94rem',
                      lineHeight: '1.7',
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                      paddingTop: '16px',
                    }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
