---
name: Canvas Design
description: Create interactive HTML5 Canvas visualizations, graphics, and animations with modern JavaScript
---

# Canvas Design

This skill helps you create interactive graphics, data visualizations, and animations using HTML5 Canvas API with modern JavaScript patterns.

## When to Use This Skill

Use this skill when you need to:
- Create custom data visualizations
- Build interactive graphics and animations
- Implement game graphics or simulations
- Generate dynamic images or effects
- Create particle systems or generative art
- Build custom drawing or diagram tools

## Core Concepts

### HTML5 Canvas Basics

The Canvas API provides a way to draw graphics via JavaScript. It's powerful for:
- **2D graphics**: Shapes, paths, text, images
- **Animations**: Frame-by-frame animation loops
- **Interactivity**: Mouse/touch event handling
- **Performance**: Hardware-accelerated rendering

## Quick Start

### Basic Canvas Setup

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    canvas {
      border: 1px solid #000;
      display: block;
      margin: 20px auto;
    }
  </style>
</head>
<body>
  <canvas id="myCanvas" width="800" height="600"></canvas>
  <script src="canvas.js"></script>
</body>
</html>
```

```javascript
// canvas.js
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Set canvas to fill window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  draw(); // Redraw content
});
```

## Drawing Primitives

### Shapes

```javascript
// Rectangle
ctx.fillStyle = '#3b82f6';
ctx.fillRect(50, 50, 200, 100);

// Stroke rectangle
ctx.strokeStyle = '#1e40af';
ctx.lineWidth = 3;
ctx.strokeRect(50, 200, 200, 100);

// Circle
ctx.beginPath();
ctx.arc(350, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = '#ef4444';
ctx.fill();

// Rounded rectangle
function roundRect(x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}
```

### Paths and Curves

```javascript
// Bezier curves
ctx.beginPath();
ctx.moveTo(50, 400);
ctx.bezierCurveTo(150, 300, 250, 500, 350, 400);
ctx.strokeStyle = '#8b5cf6';
ctx.lineWidth = 3;
ctx.stroke();

// Quadratic curve
ctx.beginPath();
ctx.moveTo(400, 400);
ctx.quadraticCurveTo(500, 300, 600, 400);
ctx.stroke();
```

## Animation Patterns

### Animation Loop

```javascript
class Animation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lastTime = 0;
    this.animate = this.animate.bind(this);
  }
  
  animate(currentTime) {
    // Calculate delta time
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw
    this.update(deltaTime);
    this.draw();
    
    // Continue animation
    requestAnimationFrame(this.animate);
  }
  
  update(deltaTime) {
    // Update game logic here
  }
  
  draw() {
    // Draw frame here
  }
  
  start() {
    requestAnimationFrame(this.animate);
  }
}

// Usage
const animation = new Animation(canvas);
animation.start();
```

### Particle System

```javascript
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.radius = Math.random() * 3 + 1;
    this.life = 1.0;
    this.decay = Math.random() * 0.01 + 0.005;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    return this.life > 0;
  }
  
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.life;
    ctx.fillStyle = `hsl(${this.life * 60}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
  }
  
  emit(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y));
    }
  }
  
  update() {
    this.particles = this.particles.filter(p => p.update());
  }
  
  draw(ctx) {
    this.particles.forEach(p => p.draw(ctx));
  }
}
```

## Interactive Canvas

### Mouse Interaction

```javascript
class InteractiveCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.mouse = { x: 0, y: 0, down: false };
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener('mousedown', () => {
      this.mouse.down = true;
    });
    
    this.canvas.addEventListener('mouseup', () => {
      this.mouse.down = false;
    });
    
    // Touch support
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
    });
  }
  
  isPointInCircle(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= radius * radius;
  }
}
```

## Data Visualization

### Bar Chart

```javascript
class BarChart {
  constructor(canvas, data) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.data = data;
    this.padding = 40;
  }
  
  draw() {
    const { ctx, canvas, data, padding } = this;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate dimensions
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / data.length;
    const maxValue = Math.max(...data.map(d => d.value));
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw bars
    data.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight;
      const x = padding + index * barWidth;
      const y = canvas.height - padding - barHeight;
      
      // Bar
      ctx.fillStyle = `hsl(${index * 30}, 70%, 50%)`;
      ctx.fillRect(x + 5, y, barWidth - 10, barHeight);
      
      // Label
      ctx.fillStyle = '#333';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, canvas.height - padding + 20);
      
      // Value
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 5);
    });
  }
}

// Usage
const data = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 59 },
  { label: 'Mar', value: 80 },
  { label: 'Apr', value: 81 },
  { label: 'May', value: 56 }
];

const chart = new BarChart(canvas, data);
chart.draw();
```

### Line Chart

```javascript
class LineChart {
  constructor(canvas, dataPoints) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dataPoints = dataPoints;
  }
  
  draw() {
    const { ctx, canvas, dataPoints } = this;
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    const maxValue = Math.max(...dataPoints);
    const minValue = Math.min(...dataPoints);
    const range = maxValue - minValue;
    
    // Draw line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    dataPoints.forEach((value, index) => {
      const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
      const y = canvas.height - padding - ((value - minValue) / range) * chartHeight;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#1e40af';
    dataPoints.forEach((value, index) => {
      const x = padding + (index / (dataPoints.length - 1)) * chartWidth;
      const y = canvas.height - padding - ((value - minValue) / range) * chartHeight;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
```

## Advanced Techniques

### Gradients

```javascript
// Linear gradient
const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
gradient.addColorStop(0, '#3b82f6');
gradient.addColorStop(1, '#8b5cf6');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Radial gradient
const radial = ctx.createRadialGradient(
  canvas.width / 2, canvas.height / 2, 50,
  canvas.width / 2, canvas.height / 2, 200
);
radial.addColorStop(0, 'rgba(59, 130, 246, 1)');
radial.addColorStop(1, 'rgba(59, 130, 246, 0)');
ctx.fillStyle = radial;
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

### Patterns and Textures

```javascript
// Create pattern from image
const img = new Image();
img.onload = () => {
  const pattern = ctx.createPattern(img, 'repeat');
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
img.src = 'texture.png';
```

### Transformations

```javascript
// Save state
ctx.save();

// Transform
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.rotate(Math.PI / 4);
ctx.scale(1.5, 1.5);

// Draw
ctx.fillRect(-50, -50, 100, 100);

// Restore state
ctx.restore();
```

## Performance Optimization

### Layer Caching

```javascript
// Create off-screen canvas for static elements
const bufferCanvas = document.createElement('canvas');
bufferCanvas.width = canvas.width;
bufferCanvas.height = canvas.height;
const bufferCtx = bufferCanvas.getContext('2d');

// Draw static content once
drawStaticBackground(bufferCtx);

// In animation loop, copy buffer
function draw() {
  ctx.drawImage(bufferCanvas, 0, 0);
  // Draw dynamic elements
}
```

### Request Animation Frame with Throttling

```javascript
let lastRender = 0;
const fps = 60;
const fpsInterval = 1000 / fps;

function animate(currentTime) {
  requestAnimationFrame(animate);
  
  const elapsed = currentTime - lastRender;
  
  if (elapsed > fpsInterval) {
    lastRender = currentTime - (elapsed % fpsInterval);
    render();
  }
}
```

## Best Practices

### Code Organization
- **Use classes** for complex animations and interactions
- **Separate concerns**: drawing logic vs. update logic
- **Create reusable components**: particles, shapes, effects
- **Comment complex algorithms** clearly

### Performance
- **Clear only what's needed**: Use dirty rectangles for partial updates
- **Use off-screen canvases**: Cache static or complex drawings
- **Limit context state changes**: Batch similar drawing operations
- **Avoid memory leaks**: Remove event listeners properly

### Accessibility
- **Provide text alternatives**: Use ARIA labels or fallback content
- **Support keyboard interaction**: Where applicable
- **Ensure sufficient contrast**: For data visualizations
- **Consider reduced motion**: Respect `prefers-reduced-motion`

## Common Patterns

### Drawing Loop Template

```javascript
class CanvasApp {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.running = false;
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  update(deltaTime) {
    // Update logic
  }
  
  draw() {
    // Clear
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw
  }
  
  loop(currentTime) {
    if (!this.running) return;
    
    const deltaTime = currentTime - (this.lastTime || currentTime);
    this.lastTime = currentTime;
    
    this.update(deltaTime);
    this.draw();
    
    requestAnimationFrame((t) => this.loop(t));
  }
  
  start() {
    this.running = true;
    requestAnimationFrame((t) => this.loop(t));
  }
  
  stop() {
    this.running = false;
  }
}
```

## Resources

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [HTML5 Canvas Deep Dive](https://joshondesign.com/p/books/canvasdeepdive/toc.html)
- [Creative Coding](https://www.youtube.com/c/TheCodingTrain)
- [Canvas Cheat Sheet](https://simon.html5.org/dump/html5-canvas-cheat-sheet.html)

## References

- [Canvas API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [p5.js](https://p5js.org/) - Creative coding library
- [Three.js](https://threejs.org/) - 3D graphics library
