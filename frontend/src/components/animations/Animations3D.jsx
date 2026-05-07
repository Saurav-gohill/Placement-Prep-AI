import React, { useEffect, useRef } from 'react';

/**
 * Floating 3D geometric shapes rendered via pure CSS.
 * Variants: 'hero' (landing), 'ambient' (dashboard/inner pages), 'minimal' (login/forms)
 */
export function FloatingShapes({ variant = 'ambient' }) {
  const configs = {
    hero: [
      { shape: 'cube', size: 60, x: '10%', y: '20%', delay: 0, duration: 20, color: 'primary' },
      { shape: 'ring', size: 80, x: '80%', y: '15%', delay: 2, duration: 25, color: 'secondary' },
      { shape: 'pyramid', size: 50, x: '70%', y: '60%', delay: 4, duration: 18, color: 'tertiary' },
      { shape: 'cube', size: 35, x: '20%', y: '75%', delay: 6, duration: 22, color: 'tertiary' },
      { shape: 'octahedron', size: 45, x: '50%', y: '40%', delay: 1, duration: 28, color: 'primary' },
      { shape: 'ring', size: 30, x: '90%', y: '80%', delay: 3, duration: 16, color: 'secondary' },
    ],
    ambient: [
      { shape: 'cube', size: 40, x: '85%', y: '10%', delay: 0, duration: 24, color: 'primary' },
      { shape: 'ring', size: 50, x: '5%', y: '70%', delay: 3, duration: 20, color: 'tertiary' },
      { shape: 'pyramid', size: 35, x: '75%', y: '80%', delay: 5, duration: 26, color: 'secondary' },
    ],
    minimal: [
      { shape: 'cube', size: 30, x: '10%', y: '20%', delay: 0, duration: 30, color: 'primary' },
      { shape: 'ring', size: 40, x: '85%', y: '75%', delay: 4, duration: 22, color: 'secondary' },
    ],
  };

  const shapes = configs[variant] || configs.ambient;

  return (
    <div className="anim-3d-container" aria-hidden="true">
      {shapes.map((s, i) => (
        <div
          key={i}
          className={`anim-3d-shape anim-3d-${s.shape} anim-3d-color-${s.color}`}
          style={{
            '--size': `${s.size}px`,
            '--x': s.x,
            '--y': s.y,
            '--delay': `${s.delay}s`,
            '--duration': `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Animated gradient orbs that float in the background.
 */
export function GlowOrbs({ count = 3 }) {
  const orbs = [
    { size: 300, x: '-5%', y: '-10%', color: 'rgba(79,70,229,0.12)', duration: 18, delay: 0 },
    { size: 250, x: '70%', y: '60%', color: 'rgba(87,27,193,0.10)', duration: 22, delay: 3 },
    { size: 200, x: '40%', y: '30%', color: 'rgba(137,206,255,0.08)', duration: 26, delay: 6 },
    { size: 180, x: '85%', y: '10%', color: 'rgba(79,70,229,0.06)', duration: 20, delay: 2 },
  ].slice(0, count);

  return (
    <div className="anim-orbs-container" aria-hidden="true">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="anim-orb"
          style={{
            '--orb-size': `${orb.size}px`,
            '--orb-x': orb.x,
            '--orb-y': orb.y,
            '--orb-color': orb.color,
            '--orb-duration': `${orb.duration}s`,
            '--orb-delay': `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * 3D tilt card wrapper — tilts on mouse hover with perspective.
 */
export function TiltCard({ children, className = '', intensity = 8 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotY = ((x - midX) / midX) * intensity;
      const rotX = ((midY - y) / midY) * intensity;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [intensity]);

  return (
    <div ref={cardRef} className={`anim-tilt-card ${className}`} style={{ transition: 'transform 0.15s ease-out' }}>
      {children}
    </div>
  );
}

/**
 * Animated particles field — tiny floating dots.
 */
export function ParticleField({ count = 30 }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="anim-particles" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="anim-particle"
          style={{
            '--px': `${p.x}%`,
            '--py': `${p.y}%`,
            '--psize': `${p.size}px`,
            '--pduration': `${p.duration}s`,
            '--pdelay': `${p.delay}s`,
            '--popacity': p.opacity,
          }}
        />
      ))}
    </div>
  );
}
