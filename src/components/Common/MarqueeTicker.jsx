import React from 'react';

export const MarqueeTicker = ({
  items = [],
  reverse = false,
  speed = 'normal',
  style = {},
}) => {
  // Duplicate array 3 times to ensure completely gapless continuous loop across wide screens
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-ribbon" style={style}>
      <div className={reverse ? 'marquee-content-reverse' : 'marquee-content'}>
        {repeatedItems.map((item, index) => (
          <div key={index} className="marquee-item">
            {typeof item === 'string' ? (
              <>
                <span>{item}</span>
                <span className="marquee-dot">◆</span>
              </>
            ) : (
              item
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
