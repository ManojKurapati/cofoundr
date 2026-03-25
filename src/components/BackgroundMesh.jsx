import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const BackgroundMesh = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates from -1 to 1 based on screen size
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, overflow: 'hidden' }}>
      {/* Base Dark Background is set in index.css body */}
      
      {/* Subdued glow that follows the cursor */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 255, 163, 0.15) 0%, rgba(0, 255, 163, 0) 70%)',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none'
        }}
        // Scale down the movement range slightly to keep it within view comfortably
        animate={{
          x: ['-50%', '-50%'],
          y: ['-50%', '-50%']
        }}
      />

      {/* Grid Mesh Effect */}
      <div 
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          opacity: 0.4
        }}
      />
      
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 0%, var(--deep-navy) 100%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default BackgroundMesh;
