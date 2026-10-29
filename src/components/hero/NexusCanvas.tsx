import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  label?: string;
}

export const NexusCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    // Check user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize network nodes
    const nodeCount = Math.min(22, Math.floor(width / 35));
    const colors = ['#06B6D4', '#38BDF8', '#818CF8', '#2563EB', '#22D3EE'];
    const nodes: Node[] = [];

    // Central community node
    nodes.push({
      x: width / 2,
      y: height / 2,
      vx: 0,
      vy: 0,
      radius: 7,
      color: '#22D3EE',
      label: 'NEXUS CORE'
    });

    for (let i = 1; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width - 60) + 30,
        y: Math.random() * (height - 60) + 30,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.45),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.45),
        radius: Math.random() * 2.5 + 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle orbital rings around center
      const centerX = nodes[0].x;
      const centerY = nodes[0].y;

      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      // Orbital ring 1
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital ring 2
      ctx.beginPath();
      ctx.arc(centerX, centerY, 145, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital ring 3
      ctx.beginPath();
      ctx.arc(centerX, centerY, 210, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Update and connect nodes
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        if (i !== 0 && !prefersReducedMotion) {
          nodeA.x += nodeA.vx;
          nodeA.y += nodeA.vy;

          if (nodeA.x < 20 || nodeA.x > width - 20) nodeA.vx *= -1;
          if (nodeA.y < 20 || nodeA.y > height - 20) nodeA.vy *= -1;

          // Mouse gentle repel
          const dx = nodeA.x - mouseX;
          const dy = nodeA.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            nodeA.x += (dx / dist) * 1.5;
            nodeA.y += (dy / dist) * 1.5;
          }
        }

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.28;
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(nodeA.x, nodeA.y, nodeA.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeA.color;
        ctx.fill();

        // Core glow
        if (i === 0) {
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, nodeA.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(34, 211, 238, 0.25)';
          ctx.fill();

          // Core label
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#BAE6FD';
          ctx.textAlign = 'center';
          ctx.fillText('NEXUS HUB', nodeA.x, nodeA.y + 22);
        }
      }

      angle += 0.005;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[480px] lg:h-[540px] flex items-center justify-center">
      {/* Decorative background grid and lighting */}
      <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
      
      {/* Technical HUD telemetry badges */}
      <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-1.5 rounded text-[11px] font-mono text-cyan-300 border-cyan-500/20 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>NODE: ABES-ACM-01 // ACTIVE</span>
      </div>

      <div className="absolute bottom-4 right-4 z-10 glass-panel px-3 py-1.5 rounded text-[11px] font-mono text-slate-400 border-slate-700/50 flex items-center gap-2">
        <span>TOPOLOGY: DISTRIBUTED</span>
        <span className="text-cyan-400">· 2K26</span>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        aria-label="Interactive Nexus Network Visualization demonstrating interconnected computing pathways."
      />
    </div>
  );
};
