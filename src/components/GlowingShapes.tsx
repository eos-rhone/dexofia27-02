import React, { useEffect, useState } from 'react';
import './GlowingShapes.css';

const GlowingShapes: React.FC = () => {
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const shape = document.querySelector('.shape');
      if (!shape) return;

      const rect = shape.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + 
        Math.pow(e.clientY - centerY, 2)
      );

      setIsGlowing(distance < 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="container">
      <div className={`shape ${isGlowing ? 'glowing' : ''}`} />
    </div>
  );
};

export default GlowingShapes;
