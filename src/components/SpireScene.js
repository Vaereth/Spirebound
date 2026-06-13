import * as THREE from 'three';

// =====================================================================
// SPIRE SCENE v3 — broad cathedral-drum behemoth
// Shape language from reference: a massive near-cylindrical tower that
// barely tapers, stacked horizontal tiers, a broad DOMED top (not a spike),
// flanking buttress-spires, grounded base. Cloud-wreathed, backlit gold,
// rune-cyan seam up the spine. Scroll rises up it; mood shifts by altitude.
// =====================================================================

const MOODS = [
  { t: 0.00, top: 0x6e5a3a, bot: 0xf2cd8a, fog: 0xe6c188, sunI: 2.1 },
  { t: 0.38, top: 0x8a93a0, bot: 0xdcc8a8, fog: 0xc8ccc6, sunI: 1.6 },
  { t: 0.70, top: 0x1c2236, bot: 0x4a4566, fog: 0x2c2942, sunI: 1.1 },
  { t: 1.00, top: 0x0a0912, bot: 0x181624, fog: 0x100e1a, sunI: 0.8 },
];
const C = (h) => new THREE.Color(h);
function moodAt(t) {
  let lo = MOODS[0], hi = MOODS[MOODS.length - 1];
  for (let i = 0; i < MOODS.length - 1; i++)
    if (t >= MOODS[i].t && t <= MOODS[i + 1].t) { lo = MOODS[i]; hi = MOODS[i + 1]; break; }
  const k = THREE.MathUtils.clamp((t - lo.t) / ((hi.t - lo.t) || 1), 0, 1);
  return { top: C(lo.top).lerp(C(hi.top), k), bot: C(lo.bot).lerp(C(hi.bot), k),
    fog: C(lo.fog).lerp(C(hi.fog), k), sunI: lo.sunI + (hi.sunI - lo.sunI) * k };
}

function makeCloudTexture() {
  const s = 256, c = document.createElement('canvas'); c.width = c.height = s;
  const ctx = c.getContext('2d'); ctx.clearRect(0, 0, s, s);
  for (let i = 0; i < 12; i++) {
    const x = s/2 + (Math.random()-0.5)*s*0.55, y = s/2 + (Math.random()-0.5)*s*0.4;
    const r = s*(0.16 + Math.random()*0.22);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(255,255,255,0.6)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true; return tex;
}
function makeGlowTexture(inner) {
  const s = 256, c = document.createElement('canvas'); c.width = c.height = s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
  g.addColorStop(0, inner); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c); tex.needsUpdate = true; return tex;
}

export class SpireScene {
  constructor(canvas) {
    this.canvas = canvas; this.scrollT = 0; this._t = 0;
    this.clock = new THREE.Clock(); this._init();
  }

  _init() {
    const { canvas } = this;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xe6c188, 0.0038);
    this._buildSkyDome();

    this.camera = new THREE.PerspectiveCamera(58, canvas.clientWidth / canvas.clientHeight, 0.1, 8000);
    this.camera.position.set(0, 60, 540);

    this.ambient = new THREE.HemisphereLight(0xfff2dc, 0x40341f, 1.0);
    this.scene.add(this.ambient);
    this.sun = new THREE.DirectionalLight(0xfff1d4, 2.1);
    this.sun.position.set(-80, 240, -300); this.scene.add(this.sun);
    // rim light from opposite side to catch tier edges
    this.rim = new THREE.DirectionalLight(0x9fd0ff, 0.5);
    this.rim.position.set(120, 60, 200); this.scene.add(this.rim);

    this.sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture('rgba(255,242,210,0.95)'), transparent: true,
      depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending }));
    this.sunGlow.scale.set(900, 900, 1);
    this.sunGlow.position.set(-60, 520, -900); this.scene.add(this.sunGlow);

    this._buildSpire(); this._buildClouds(); this._buildStars();
    window.addEventListener('resize', this._onResize);
  }

  _buildSkyDome() {
    const geo = new THREE.SphereGeometry(4000, 32, 16);
    this.skyMat = new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false,
      uniforms: { top: { value: C(0x6e5a3a) }, bot: { value: C(0xf2cd8a) } },
      vertexShader: 'varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} ',
      fragmentShader: 'varying vec3 vP; uniform vec3 top; uniform vec3 bot; void main(){ float h=clamp((normalize(vP).y*0.5+0.5),0.0,1.0); gl_FragColor=vec4(mix(bot,top,pow(h,0.8)),1.0);} ' });
    this.sky = new THREE.Mesh(geo, this.skyMat); this.scene.add(this.sky);
  }

  _buildSpire() {
    this.spire = new THREE.Group();
    const SEG = 72;
    const tiers = 14;
    const tierH = 78;
    // KEY: barely taper. Stays broad. (ref: massive drum, not a cone)
    const baseR = 200, topR = 150;
    const stone = new THREE.MeshStandardMaterial({ color: 0xb9b3a0, roughness: 0.85, metalness: 0.04 });
    const trim  = new THREE.MeshStandardMaterial({ color: 0xd8cfb6, roughness: 0.65, metalness: 0.08 });
    const dark  = new THREE.MeshStandardMaterial({ color: 0x8a8472, roughness: 0.9, metalness: 0.03 });

    const radiusAt = (f) => THREE.MathUtils.lerp(baseR, topR, f); // gentle linear taper

    const totalH = tiers * tierH;

    // Wide grounded plinth at the base
    const plinth = new THREE.Mesh(new THREE.CylinderGeometry(baseR * 1.25, baseR * 1.4, 60, SEG), dark);
    plinth.position.y = -30; this.spire.add(plinth);

    for (let i = 0; i < tiers; i++) {
      const f0 = i / tiers, f1 = (i + 1) / tiers;
      const rB = radiusAt(f0), rT = radiusAt(f1), y = i * tierH;
      // main drum (nearly straight walls)
      const drum = new THREE.Mesh(new THREE.CylinderGeometry(rT, rB, tierH, SEG, 1, false), stone);
      drum.position.y = y + tierH/2; this.spire.add(drum);
      // pronounced overhang cornice at each tier top
      const cornice = new THREE.Mesh(new THREE.CylinderGeometry(rT * 1.10, rT * 1.0, tierH * 0.16, SEG), trim);
      cornice.position.y = y + tierH; this.spire.add(cornice);
      // recessed band just under the cornice (depth/shadow)
      const band = new THREE.Mesh(new THREE.CylinderGeometry(rT * 0.97, rT * 0.97, tierH * 0.12, SEG), dark);
      band.position.y = y + tierH * 0.86; this.spire.add(band);
      // rune ring on the cornice
      const ring = new THREE.Mesh(new THREE.TorusGeometry(rT * 1.11, 1.8, 8, SEG),
        new THREE.MeshBasicMaterial({ color: 0x60e8dc, transparent: true, opacity: 0.6 }));
      ring.rotation.x = Math.PI/2; ring.position.y = y + tierH; this.spire.add(ring);
    }

    // BROAD DOMED TOP (castle crown, not a spike)
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(topR * 1.02, SEG, 24, 0, Math.PI*2, 0, Math.PI/2), trim);
    dome.position.y = totalH; this.spire.add(dome);
    // lantern crown on the dome
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(topR*0.28, topR*0.34, 50, SEG), stone);
    lantern.position.y = totalH + topR * 0.55; this.spire.add(lantern);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(topR*0.3, 32, 16, 0, Math.PI*2, 0, Math.PI/2), trim);
    cap.position.y = totalH + topR*0.55 + 25; this.spire.add(cap);

    // Flanking buttress-spires (break the round silhouette → reads "built")
    const buttressMat = stone;
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + Math.PI/4;
      const bx = Math.cos(ang) * (baseR * 1.02), bz = Math.sin(ang) * (baseR * 1.02);
      const bh = totalH * 0.82;
      const but = new THREE.Mesh(new THREE.BoxGeometry(46, bh, 46), buttressMat);
      but.position.set(bx, bh/2, bz); this.spire.add(but);
      // pointed cap on each buttress
      const tip = new THREE.Mesh(new THREE.ConeGeometry(32, 70, 6), trim);
      tip.position.set(bx, bh + 35, bz); this.spire.add(tip);
    }

    // Glowing rune SEAM up the spine front (the blue light-line from the ref)
    const seam = new THREE.Mesh(new THREE.BoxGeometry(6, totalH + topR, 6),
      new THREE.MeshBasicMaterial({ color: 0x60e8dc, transparent: true, opacity: 0.85 }));
    seam.position.set(0, totalH/2, baseR * 0.96); this.spire.add(seam);
    this.seam = seam;
    const seamGlow = new THREE.PointLight(0x60e8dc, 2.0, 800);
    seamGlow.position.set(0, totalH*0.5, baseR*1.1); this.spire.add(seamGlow);

    const beacon = new THREE.PointLight(0x9fd0ff, 2.5, 900);
    beacon.position.y = totalH + topR; this.spire.add(beacon);

    this.spire.position.y = -300; // ground/base sinks into the cloud bank
    this.scene.add(this.spire);
    this.spireTotalH = totalH;
  }

  _buildClouds() {
    this.cloudTex = makeCloudTexture(); this.clouds = [];
    const add = (count, yMin, yMax, zMin, zMax, sMin, sMax, op, tint) => {
      for (let i = 0; i < count; i++) {
        const mat = new THREE.SpriteMaterial({ map: this.cloudTex, transparent: true,
          opacity: op*(0.6+Math.random()*0.6), depthWrite: false, color: tint });
        const s = new THREE.Sprite(mat);
        const sc = THREE.MathUtils.lerp(sMin, sMax, Math.random());
        s.scale.set(sc, sc*0.46, 1);
        s.position.set((Math.random()-0.5)*2000, THREE.MathUtils.lerp(yMin,yMax,Math.random()), THREE.MathUtils.lerp(zMin,zMax,Math.random()));
        s.userData = { driftX: (Math.random()-0.5)*5 };
        this.scene.add(s); this.clouds.push(s);
      }
    };
    add(16, -100, 900, -1300, -700, 700, 1500, 0.30, 0xf2dcae);
    add(22, -300, 800, -340, -160, 450, 1000, 0.38, 0xeacf9e);
    add(20, -360, -80, -260, 120, 550, 1200, 0.55, 0xe6c896);
    add(12, -160, 500, 200, 420, 400, 900, 0.42, 0xf4e0b6);
  }

  _buildStars() {
    const N = 500, pos = new Float32Array(N*3);
    for (let i = 0; i < N; i++) { pos[i*3]=(Math.random()-0.5)*4000; pos[i*3+1]=Math.random()*2200+300; pos[i*3+2]=-800-Math.random()*2000; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos,3));
    this.starMat = new THREE.PointsMaterial({ color: 0xcfe8ff, size: 2.6, transparent: true, opacity: 0 });
    this.stars = new THREE.Points(g, this.starMat); this.scene.add(this.stars);
  }

  setScroll(t) { this.scrollT = THREE.MathUtils.clamp(t, 0, 1); }
  _onResize = () => { const {canvas}=this; const w=canvas.clientWidth,h=canvas.clientHeight;
    this.renderer.setSize(w,h,false); this.camera.aspect=w/h; this.camera.updateProjectionMatrix(); };

  render = () => {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const el = this.clock.getElapsedTime();
    this._t += (this.scrollT - this._t) * Math.min(1, dt*2.5);
    const t = this._t;

    const camY = THREE.MathUtils.lerp(60, this.spireTotalH - 280, t);
    this.camera.position.y = camY + Math.sin(el*0.3)*5;
    this.camera.position.z = THREE.MathUtils.lerp(560, 420, t);
    this.camera.position.x = Math.sin(el*0.07)*24;
    this.camera.lookAt(0, camY + 170, 0);

    this.spire.rotation.y = el*0.012;
    // pulse the rune seam
    if (this.seam) this.seam.material.opacity = 0.6 + Math.sin(el*1.6)*0.25;

    const m = moodAt(t);
    this.skyMat.uniforms.top.value.copy(m.top);
    this.skyMat.uniforms.bot.value.copy(m.bot);
    this.scene.fog.color.copy(m.fog);
    this.sun.intensity = m.sunI;
    this.sunGlow.material.opacity = THREE.MathUtils.lerp(1.0, 0.3, t);

    for (const s of this.clouds) {
      s.position.x += s.userData.driftX * dt;
      if (s.position.x > 1100) s.position.x = -1100;
      if (s.position.x < -1100) s.position.x = 1100;
    }
    this.starMat.opacity = THREE.MathUtils.smoothstep(t, 0.5, 0.95) * 0.9;

    this.renderer.render(this.scene, this.camera);
    if (this._running) this._raf = requestAnimationFrame(this.render);
    else this._raf = null;
  };

  start() { this._running = true; if (!this._raf) this._raf = requestAnimationFrame(this.render); }
  pause() { this._running = false; if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; } }
  resume() { if (!this._running) this.start(); }
  dispose() { this.pause(); window.removeEventListener('resize', this._onResize); this.renderer.dispose(); }
}
