import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import styles from './Home.module.css';
// import InlineIndiaMap from './InlineIndiaMap'; // Your SVG as React Component

export default function Home() {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const tooltip = tooltipRef.current;
    const regions = document.querySelectorAll('svg path[id]');

    const statesInfo = {
      INMH: "Maharashtra – Gateway of India and Bollywood",
      INUP: "Uttar Pradesh – Land of the Ganga and culture",
      INRJ: "Rajasthan – Desert and royal heritage",
      // Add all states...
    };

    regions.forEach((region) => {
      region.style.cursor = 'pointer';
      region.style.transition = 'all 0.2s ease';

      region.addEventListener('mouseover', () => {
        const id = region.id;
        tooltip.innerText = statesInfo[id] || id;
        tooltip.style.opacity = 1;
        tooltip.style.transform = 'scale(1.05)';

        const bbox = region.getBBox();
        tooltip.style.left = `${bbox.x + bbox.width / 2}px`;
        tooltip.style.top = `${bbox.y - 20}px`;

        region.style.fillOpacity = 0.8;
        region.style.transform = 'scale(1.05)';
      });

      region.addEventListener('mouseout', () => {
        tooltip.style.opacity = 0;
        tooltip.style.transform = 'scale(0.9)';
        region.style.fillOpacity = 1;
        region.style.transform = 'scale(1)';
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Explore Indian States</h2>

        <div className={styles.mapContainer}>
          
          <div ref={tooltipRef} className={styles.tooltip}></div>
        </div>
      </div>
    </>
  );
}
