(() => {
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  // Disable code rain specifically for discover section
  if (document.body && document.body.classList.contains("no-code-rain")) {
    return;
  }

  // Also disable if we're on the discover tab
  const discoverSection = document.getElementById('discover');
  if (discoverSection && discoverSection.classList.contains('active')) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.id = "codeRainCanvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });

  // Enhanced romantic glyphs and symbols
  const glyphs =
    "01{}[]()<>/=+-_*&|!?:;.,@#$%^~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz♥♡❤💕💖💗💓💝💞💟💘💋🌹🌸🌺🌷🌻🌼🌙⭐✨💫🌟💎🔮🎭🎪🎨🎭🌈";

  // More realistic code snippets with actual programming patterns
  const snippets = [
    "const love = { you: 'my world', forever: true }; return love;",
    "if (heart.beats) { return 'love you forever'; } else { wait(); }",
    "while(true) { console.log('You are amazing 💕'); break; }",
    "const romance = new Promise((resolve) => resolve('eternal love'));",
    "function kiss() { return '💋 romantic moment'; } kiss();",
    "let passion = 'infinite'; let desire = 'eternal'; passion += desire;",
    "const together = { you: 'perfect', me: 'lucky' }; Object.freeze(together);",
    "if (soulmate) { happiness = 'unlimited'; } else { search(); }",
    "const dream = 'you and me forever 💑'; dream.toString();",
    "while(days.pass) { love.growsStronger(); }",
    "const magic = moment.when('eyes.meet'); magic.execute();",
    "if (destiny.exists) { return 'us.together'; }",
    "const forever = { start: 'today', end: 'never' }; forever.validate();",
    "function romance() { return 'hearts.entwined'; } romance();",
    "const passion = new Date('eternal.love'); passion.getTime();",
    "if (you.smile) { world.brightens(); }",
    "const destiny = 'written.in.the.stars ✨'; destiny.split('.');",
    "while(love.exists) { happiness.increases(); }",
    "const moment = 'perfect.together.right.now'; moment.valueOf();",
    "if (souls.connect) { magic.happens(); return true; }"
  ];

  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let w = 0;
  let h = 0;

  function resize() {
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    w = Math.floor(window.innerWidth);
    h = Math.floor(window.innerHeight);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });

  const fontSize = 14;
  const colWidth = fontSize * 1.0;
  const cols = () => Math.max(20, Math.floor(w / colWidth)); // Much more columns for denser effect

  function makeStream(direction) {
    const x = Math.floor(Math.random() * cols()) * colWidth;
    const speed = (2.0 + Math.random() * 6.0) * direction; // Increased speed for more realistic effect
    const y = direction === 1 ? -Math.random() * h : h + Math.random() * h;
    const length = 20 + Math.floor(Math.random() * 55); // Longer streams for realism
    const bright = 0.18 + Math.random() * 0.27; // Slightly brighter for realism
    const useSnippet = Math.random() < 0.4; // More realistic code snippets
    const text = useSnippet
      ? snippets[Math.floor(Math.random() * snippets.length)]
      : "";
    return { x, y, speed, length, bright, useSnippet, text, t: Math.random() * 9999 };
  }

  // Ultra-enhanced stream density for maximum attraction
  let streamCount = 0;
  function resetStreams() {
    const base = Math.floor(cols() * 2.5); // Ultra dense
    streamCount = Math.min(400, Math.max(180, base)); // Maximum streams
    streamsDown.length = 0;
    streamsUp.length = 0;
    for (let i = 0; i < Math.floor(streamCount * 0.7); i++) streamsDown.push(makeStream(1));
    for (let i = 0; i < Math.floor(streamCount * 0.3); i++) streamsUp.push(makeStream(-1));
  }

  const streamsDown = [];
  const streamsUp = [];
  resetStreams();

  let last = performance.now();

  function drawStream(s) {
    const headX = s.x;
    const headY = s.y;

    // Enhanced romantic tail fade
    for (let i = 0; i < s.length; i++) {
      const y = headY - i * Math.sign(s.speed) * (fontSize * 1.1);
      if (y < -fontSize * 2 || y > h + fontSize * 2) continue;

      const p = 1 - i / s.length;
      const alpha = Math.max(0, p) * s.bright;
      const glow = i === 0 ? 0.35 : 0.15;

      // Unique professional color palette never used before
  const professionalColors = [
    `rgba(138, 43, 226, ${alpha})`, // Electric Violet
    `rgba(0, 191, 255, ${alpha})`,  // Deep Sky Blue
    `rgba(255, 20, 147, ${alpha})`, // Deep Pink
    `rgba(50, 205, 50, ${alpha})`,  // Lime Green
    `rgba(255, 140, 0, ${alpha})`,  // Dark Orange
    `rgba(147, 112, 219, ${alpha})`, // Medium Purple
    `rgba(0, 255, 127, ${alpha})`,  // Spring Green
    `rgba(255, 69, 0, ${alpha})`,   // Red Orange
    `rgba(64, 224, 208, ${alpha})`,  // Turquoise
    `rgba(255, 215, 0, ${alpha})`,  // Gold
    `rgba(218, 112, 214, ${alpha})`, // Orchid
    `rgba(32, 178, 170, ${alpha})`,  // Light Sea Green
    `rgba(255, 105, 180, ${alpha})`, // Hot Pink
    `rgba(124, 252, 0, ${alpha})`,   // Lawn Green
    `rgba(255, 182, 193, ${alpha})`, // Light Pink
    `rgba(147, 112, 219, ${alpha})`, // Medium Purple
    `rgba(0, 191, 255, ${alpha})`,   // Deep Sky Blue
    `rgba(50, 205, 50, ${alpha})`,   // Lime Green
    `rgba(255, 140, 0, ${alpha})`,   // Dark Orange
    `rgba(138, 43, 226, ${alpha})`   // Electric Violet
  ];
      
      const colorIndex = Math.floor((s.t + i * 2) % professionalColors.length);
      ctx.fillStyle = professionalColors[colorIndex];
      ctx.shadowColor = professionalColors[colorIndex];
      ctx.shadowBlur = 15; // Enhanced glow

      let ch;
      if (s.useSnippet) {
        const idx = Math.floor((s.t + i * 3) % Math.max(1, s.text.length));
        ch = s.text.charAt(idx) || glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      } else {
        ch = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
      }

      ctx.fillText(ch, headX, y);
    }

    ctx.shadowBlur = 0;
  }

  // Enhanced romantic horizontal ribbons
  const ribbons = [];
  function resetRibbons() {
    ribbons.length = 0;
    if (!document.body.classList.contains("homepage")) return;

    const count = 10; // More ribbons
    for (let i = 0; i < count; i++) {
      const y = (h / (count + 1)) * (i + 1) + (Math.random() * 60 - 30);
      const speed = (15 + Math.random() * 60) * (Math.random() < 0.5 ? 1 : -1);
      ribbons.push({
        y,
        x: Math.random() * w,
        speed,
        text: snippets[Math.floor(Math.random() * snippets.length)],
        bright: 0.25 + Math.random() * 0.15,
      });
    }
  }

  function drawRibbons(dt) {
    if (!ribbons.length) return;
    ctx.font = `14px Consolas, 'Fira Code', 'Source Code Pro', monospace`;
    ctx.textBaseline = "top";

    ribbons.forEach((r, idx) => {
      r.x += r.speed * (dt / 1000);
      const width = ctx.measureText(r.text).width + 100;

      if (r.speed > 0 && r.x > w + 50) r.x = -width;
      if (r.speed < 0 && r.x < -width) r.x = w + 50;

      // Professional ribbon colors
      const ribbonColors = [
        `rgba(138, 43, 226, ${r.bright})`, // Electric Violet
        `rgba(0, 191, 255, ${r.bright})`,  // Deep Sky Blue
        `rgba(255, 20, 147, ${r.bright})`, // Deep Pink
        `rgba(50, 205, 50, ${r.bright})`,  // Lime Green
        `rgba(255, 140, 0, ${r.bright})`,  // Dark Orange
        `rgba(147, 112, 219, ${r.bright})`, // Medium Purple
        `rgba(0, 255, 127, ${r.bright})`,  // Spring Green
        `rgba(255, 69, 0, ${r.bright})`,   // Red Orange
        `rgba(64, 224, 208, ${r.bright})`,  // Turquoise
        `rgba(255, 215, 0, ${r.bright})`,  // Gold
      ];
      
      const colorIndex = idx % ribbonColors.length;
      ctx.fillStyle = ribbonColors[colorIndex];
      ctx.shadowColor = ribbonColors[colorIndex];
      ctx.shadowBlur = 12; // Enhanced glow
      ctx.fillText(r.text, r.x, r.y);
      ctx.shadowBlur = 0;
    });
  }

  function loop(now) {
    const dt = Math.min(40, now - last);
    last = now;

    // Enhanced romantic fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)"; // Slower fade for more trails
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px Consolas, 'Fira Code', 'Source Code Pro', monospace`;
    ctx.textBaseline = "top";

    const all = streamsDown.concat(streamsUp);
    for (const s of all) {
      s.y += s.speed * (dt / 16);
      s.t += dt * 0.03;
      drawStream(s);

      if (s.speed > 0 && s.y - s.length * fontSize > h + 50) {
        Object.assign(s, makeStream(1));
      } else if (s.speed < 0 && s.y + s.length * fontSize < -50) {
        Object.assign(s, makeStream(-1));
      }
    }

    // Enhanced romantic ribbons
    drawRibbons(dt);

    requestAnimationFrame(loop);
  }

  // Add floating hearts
  function addFloatingHearts() {
    if (!document.body.classList.contains("homepage")) return;
    
    setInterval(() => {
      const heart = document.createElement('div');
      heart.innerHTML = '💕';
      heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: 100vh;
        font-size: ${15 + Math.random() * 10}px;
        color: rgba(255, 105, 180, 0.8);
        pointer-events: none;
        z-index: 1;
        animation: floatHeart ${8 + Math.random() * 4}s ease-in-out;
      `;
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 12000);
    }, 3000);
  }

  // Add CSS for floating hearts
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatHeart {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Start floating hearts
  addFloatingHearts();

  // Recompute density after a short delay
  setTimeout(() => {
    resetStreams();
    resetRibbons();
  }, 400);

  requestAnimationFrame((t) => {
    last = t;
    requestAnimationFrame(loop);
  });
})();

