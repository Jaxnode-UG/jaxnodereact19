"use client";
import { useRef, useEffect } from 'react';

// Define interfaces for game objects
interface Ship {
  x: number;
  y: number;
  r: number;
  angle: number;
  vx: number;
  vy: number;
  thrust: boolean;
  rotatingLeft: boolean;
  rotatingRight: boolean;
  shooting: boolean;
  canShoot: boolean;
  shootCooldown: number;
  timeSinceLastShot: number;
}

interface Asteroid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  r: number;
  destroyed: boolean;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  creationTime: number;
  destroyed: boolean;
}

type GameState = {
  ship: Ship;
  asteroids: Asteroid[];
  bullets: Bullet[];
  keys: { [key: string]: boolean };
};

const AsteroidsGame: React.FC = () => {
  // Reference to the canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Reference to the game state
  const gameStateRef = useRef<GameState>({
    ship: {} as Ship, // Initialized fully in init()
    asteroids: [],
    bullets: [],
    keys: {}
  });

  const fireSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gameState = gameStateRef.current;

    fireSoundRef.current = new Audio('/laser5.wav'); // Path relative to public folder
    fireSoundRef.current.preload = 'auto'; // Preload the sound

    // #### Game Constants
    const SHIP_SIZE = 20;
    const SHIP_THRUST = 5;
    const SHIP_ROTATION_SPEED = 360; // degrees per second
    const BULLET_SPEED = 300;
    const BULLET_LIFESPAN = 2; // seconds
    const ASTEROID_SIZES = [30, 20, 10]; // large, medium, small
    const ASTEROID_SPEED = 50;
    const INITIAL_ASTEROIDS = 5;

    // #### Utility Functions
    function distanceBetweenPoints(x1: number, y1: number, x2: number, y2: number): number {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function circlesCollide(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < r1 + r2;
    }

    // #### Game Logic Functions
    function createAsteroid(x: number, y: number, size: number): void {
      const asteroid: Asteroid = {
        x,
        y,
        vx: (Math.random() - 0.5) * ASTEROID_SPEED,
        vy: (Math.random() - 0.5) * ASTEROID_SPEED,
        size,
        r: ASTEROID_SIZES[size],
        destroyed: false
      };
      gameState.asteroids.push(asteroid);
    }

    function shootBullet(): void {
      const { ship } = gameState;
      const bullet: Bullet = {
        x: ship.x + Math.cos(ship.angle) * SHIP_SIZE / 2,
        y: ship.y + Math.sin(ship.angle) * SHIP_SIZE / 2,
        vx: Math.cos(ship.angle) * BULLET_SPEED,
        vy: Math.sin(ship.angle) * BULLET_SPEED,
        creationTime: Date.now() / 1000,
        destroyed: false
      };
      gameState.bullets.push(bullet);

      if (fireSoundRef.current) {
        fireSoundRef.current.currentTime = 0; // Reset to start (for overlapping shots)
        fireSoundRef.current.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }
    }

    function checkCollisions(): void {
      const { bullets, asteroids, ship } = gameState;
      bullets.forEach(bullet => {
        asteroids.forEach(asteroid => {
          if (circlesCollide(bullet.x, bullet.y, 2, asteroid.x, asteroid.y, asteroid.r)) {
            bullet.destroyed = true;
            asteroid.destroyed = true;
            if (asteroid.size < 2) {
              createAsteroid(asteroid.x, asteroid.y, asteroid.size + 1);
              createAsteroid(asteroid.x, asteroid.y, asteroid.size + 1);
            }
          }
        });
      });

      asteroids.forEach(asteroid => {
        if (circlesCollide(ship.x, ship.y, ship.r, asteroid.x, asteroid.y, asteroid.r) && canvas) {
          ship.x = canvas.width / 2;
          ship.y = canvas.height / 2;
          ship.vx = 0;
          ship.vy = 0;
        }
      });
    }

    function update(deltaTime: number): void {
      const { ship, asteroids, bullets, keys } = gameState;

      // Handle keyboard inputs
      ship.rotatingLeft = !!keys['ArrowLeft'];
      ship.rotatingRight = !!keys['ArrowRight'];
      ship.thrust = !!keys['ArrowUp'];
      ship.shooting = !!keys['Space'];

      // Ship rotation
      if (ship.rotatingLeft) {
        ship.angle -= (SHIP_ROTATION_SPEED * Math.PI / 180) * deltaTime;
      }
      if (ship.rotatingRight) {
        ship.angle += (SHIP_ROTATION_SPEED * Math.PI / 180) * deltaTime;
      }

      // Ship thrust
      if (ship.thrust) {
        ship.vx += Math.cos(ship.angle) * SHIP_THRUST * deltaTime;
        ship.vy += Math.sin(ship.angle) * SHIP_THRUST * deltaTime;
      }

      // Update ship position
      ship.x += ship.vx * deltaTime;
      ship.y += ship.vy * deltaTime;

      // Wrap ship around screen edges
      if (ship.x < 0) ship.x = canvas!.width;
      if (ship.x > canvas!.width) ship.x = 0;
      if (ship.y < 0) ship.y = canvas!.height;
      if (ship.y > canvas!.height) ship.y = 0;

      // Handle shooting
      ship.timeSinceLastShot += deltaTime;
      if (ship.shooting && ship.timeSinceLastShot > ship.shootCooldown) {
        shootBullet();
        ship.timeSinceLastShot = 0;
      }

      // Update bullets
      const currentTime = Date.now() / 1000;
      bullets.forEach(bullet => {
        bullet.x += bullet.vx * deltaTime;
        bullet.y += bullet.vy * deltaTime;
        if (bullet.x < 0) bullet.x = canvas!.width;
        if (bullet.x > canvas!.width) bullet.x = 0;
        if (bullet.y < 0) bullet.y = canvas!.height;
        if (bullet.y > canvas!.height) bullet.y = 0;
        if (currentTime - bullet.creationTime > BULLET_LIFESPAN) {
          bullet.destroyed = true;
        }
      });

      // Update asteroids
      asteroids.forEach(asteroid => {
        asteroid.x += asteroid.vx * deltaTime;
        asteroid.y += asteroid.vy * deltaTime;
        if (asteroid.x < 0) asteroid.x = canvas!.width;
        if (asteroid.x > canvas!.width) asteroid.x = 0;
        if (asteroid.y < 0) asteroid.y = canvas!.height;
        if (asteroid.y > canvas!.height) asteroid.y = 0;
      });

      // Check collisions
      checkCollisions();

      // Remove destroyed objects
      gameState.bullets = bullets.filter(bullet => !bullet.destroyed);
      gameState.asteroids = asteroids.filter(asteroid => !asteroid.destroyed);
    }

    function render(): void {
      const { ship, bullets, asteroids } = gameState;

      // Clear the canvas
      ctx!.fillStyle = 'black';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Draw ship
      ctx!.save();
      ctx!.translate(ship.x, ship.y);
      ctx!.rotate(ship.angle);
      ctx!.beginPath();
      ctx!.moveTo(SHIP_SIZE / 2, 0);
      ctx!.lineTo(-SHIP_SIZE / 2, SHIP_SIZE / 2);
      ctx!.lineTo(-SHIP_SIZE / 2, -SHIP_SIZE / 2);
      ctx!.closePath();
      ctx!.fillStyle = 'white';
      ctx!.fill();
      ctx!.restore();

      // Draw bullets
      ctx!.fillStyle = 'white';
      bullets.forEach(bullet => {
        ctx!.beginPath();
        ctx!.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
        ctx!.fill();
      });

      // Draw asteroids
      ctx!.strokeStyle = 'white';
      asteroids.forEach(asteroid => {
        ctx!.beginPath();
        ctx!.arc(asteroid.x, asteroid.y, asteroid.r, 0, Math.PI * 2);
        ctx!.stroke();
      });
    }

    function init(): void {
      gameState.ship = {
        x: canvas!.width / 2,
        y: canvas!.height / 2,
        r: SHIP_SIZE / 2,
        angle: 0,
        vx: 0,
        vy: 0,
        thrust: false,
        rotatingLeft: false,
        rotatingRight: false,
        shooting: false,
        canShoot: true,
        shootCooldown: 0.3,
        timeSinceLastShot: 0
      };
      gameState.asteroids = [];
      gameState.bullets = [];

      // Spawn initial asteroids
      for (let i = 0; i < INITIAL_ASTEROIDS; i++) {
        let x: number, y: number;
        do {
          x = Math.random() * canvas!.width;
          y = Math.random() * canvas!.height;
        } while (distanceBetweenPoints(gameState.ship.x, gameState.ship.y, x, y) < 100);
        createAsteroid(x, y, 0);
      }
    }

    // Initialize the game
    init();

    // #### Game Loop Setup
    let animationFrameId: number;
    let lastTime = Date.now() / 1000;

    const handleKeyDown = (e: KeyboardEvent): void => {
      gameState.keys[e.code] = true;
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      gameState.keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      const currentTime = Date.now() / 1000;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      update(deltaTime);
      render();

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    gameLoop();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ backgroundColor: 'black' }}
      />
    </div>
  );
};

export default AsteroidsGame;
