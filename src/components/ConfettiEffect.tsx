import { useEffect } from "react";
import confetti from "canvas-confetti";

const ConfettiEffect = () => {
  useEffect(() => {
    // Initial confetti burst on page load
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 25, 
      spread: 100, 
      ticks: 60, 
      zIndex: 0, 
      scalar: 0.8 
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    let animationFrameId: number;
    let lastTime = Date.now();
    const intervalTime = 250;

    const animate = () => {
      const currentTime = Date.now();
      const timeLeft = animationEnd - currentTime;

      if (timeLeft <= 0) {
        return;
      }

      if (currentTime - lastTime >= intervalTime) {
        const particleCount = 15 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#FF1493', '#FF69B4', '#FFD700', '#FF6347', '#9370DB', '#00CED1', '#FF1493']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#FF1493', '#FF69B4', '#FFD700', '#FF6347', '#9370DB', '#00CED1', '#FF1493']
        });
        confetti({
          ...defaults,
          particleCount: particleCount * 0.4,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#FF1493', '#FFD700', '#9370DB', '#00CED1']
        });
        
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    // Rocket fireworks that launch after initial confetti
    const rocketDelay = setTimeout(() => {
      const launchTwoRockets = () => {
        const rocketCount = 2;
        for (let i = 0; i < rocketCount; i++) {
          const originX = Math.random() * 0.6 + 0.2;
          const colors = [
            ['#FF1493', '#FF69B4', '#FFD700'],
            ['#9370DB', '#00CED1', '#FFD700'],
            ['#FF6347', '#FFD700', '#FF1493'],
            ['#00CED1', '#9370DB', '#FF69B4']
          ];
          const rocketColors = colors[Math.floor(Math.random() * colors.length)];
          const launchDelay = Math.random() * 800;
          
          setTimeout(() => {
            const trajectoryAngle = 85 + (Math.random() * 10 - 5);
            const horizontalDrift = (Math.random() - 0.5) * 0.08;
            
            const duration = 1200;
            const animationEnd = Date.now() + duration;
            let currentY = 1.0;
            let currentX = originX;
            let finalX = originX;
            let finalY = 0.3;
            
            const frame = () => {
              const progress = 1 - (animationEnd - Date.now()) / duration;
              currentY = 1.0 - (progress * 0.7);
              currentX = originX + (horizontalDrift * progress);
              
              finalX = currentX;
              finalY = currentY;
              
              confetti({
                particleCount: 1,
                angle: trajectoryAngle,
                spread: 3,
                startVelocity: 0,
                decay: 0.96,
                scalar: 0.6,
                origin: { x: currentX, y: currentY },
                colors: rocketColors,
                zIndex: 0,
                gravity: 0,
                drift: 0,
                ticks: 30
              });

              if (Date.now() < animationEnd) {
                requestAnimationFrame(frame);
              }
            };
            frame();

            setTimeout(() => {
              confetti({
                particleCount: 80,
                angle: 90,
                spread: 360,
                startVelocity: 30,
                decay: 0.91,
                scalar: 0.9,
                origin: { x: finalX, y: finalY },
                colors: rocketColors,
                zIndex: 0,
                gravity: 1,
                drift: 0,
                ticks: 200
              });
            }, duration);
          }, launchDelay);
        }
      };

      launchTwoRockets();
      setTimeout(launchTwoRockets, 2000 + Math.random() * 1000);
      setTimeout(launchTwoRockets, 4500 + Math.random() * 1000);
    }, 2500);

    return () => clearTimeout(rocketDelay);
  }, []);

  return null;
};

export default ConfettiEffect;
