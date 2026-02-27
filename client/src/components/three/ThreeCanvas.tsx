/**
 * ThreeCanvas - Main Three.js canvas wrapper for the scrollytelling experience.
 * Manages the WebGL renderer, camera, and scene transitions based on scroll position.
 */
import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1
}

// Color palette
const COLORS = {
  darkBlue: 0x0a1a2f,
  midBlue: 0x102a43,
  cyan: 0x00b8b8,
  gold: 0xc9a14b,
  neonRed: 0xff3344,
  neonBlue: 0x00aaff,
  white: 0xffffff,
  gray: 0x888888,
};

const ThreeCanvas = ({ scrollProgress }: ThreeCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>(0);
  const objectsRef = useRef<{
    buildings: THREE.Group;
    bus: THREE.Group;
    busPath: THREE.CatmullRomCurve3;
    billboards: THREE.Group;
    smartBuilding: THREE.Group;
    tourismScene: THREE.Group;
    ground: THREE.Mesh;
    particles: THREE.Points;
    streetLights: THREE.Group;
    people: THREE.Group;
  } | null>(null);

  const createBuilding = useCallback((width: number, height: number, depth: number, color: number, x: number, z: number) => {
    const group = new THREE.Group();
    
    // Main building body
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshPhongMaterial({
      color,
      transparent: true,
      opacity: 0.9,
      shininess: 80,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = height / 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Window rows
    const windowMat = new THREE.MeshPhongMaterial({
      color: 0x66ccff,
      emissive: 0x224466,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
    });
    const windowRows = Math.floor(height / 0.8);
    const windowCols = Math.floor(width / 0.6);
    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        const winGeo = new THREE.PlaneGeometry(0.3, 0.4);
        const win = new THREE.Mesh(winGeo, windowMat);
        win.position.set(
          -width / 2 + 0.4 + col * 0.6,
          0.6 + row * 0.8,
          depth / 2 + 0.01
        );
        group.add(win);
      }
    }

    // Roof accent
    const roofGeo = new THREE.BoxGeometry(width + 0.1, 0.15, depth + 0.1);
    const roofMat = new THREE.MeshPhongMaterial({ color: COLORS.cyan, emissive: COLORS.cyan, emissiveIntensity: 0.3 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = height;
    group.add(roof);

    group.position.set(x, 0, z);
    return group;
  }, []);

  const createScene = useCallback(() => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.darkBlue, 0.015);

    // === LIGHTING ===
    const ambientLight = new THREE.AmbientLight(0x334466, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(10, 20, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const cyanLight = new THREE.PointLight(COLORS.cyan, 2, 50);
    cyanLight.position.set(0, 10, 5);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(COLORS.gold, 1.5, 40);
    goldLight.position.set(-10, 8, -5);
    scene.add(goldLight);

    // === GROUND ===
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.MeshPhongMaterial({
      color: 0x0d2137,
      shininess: 30,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // === ROAD ===
    const roadGeo = new THREE.PlaneGeometry(6, 100);
    const roadMat = new THREE.MeshPhongMaterial({ color: 0x1a1a2e });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0.01;
    scene.add(road);

    // Road markings
    for (let i = -45; i < 45; i += 4) {
      const markGeo = new THREE.PlaneGeometry(0.2, 2);
      const markMat = new THREE.MeshPhongMaterial({ color: COLORS.gold, emissive: COLORS.gold, emissiveIntensity: 0.3 });
      const mark = new THREE.Mesh(markGeo, markMat);
      mark.rotation.x = -Math.PI / 2;
      mark.position.set(0, 0.02, i);
      scene.add(mark);
    }

    // Neon road edges
    const edgeMat = new THREE.MeshPhongMaterial({ color: COLORS.cyan, emissive: COLORS.cyan, emissiveIntensity: 0.8 });
    for (const side of [-3.1, 3.1]) {
      const edgeGeo = new THREE.PlaneGeometry(0.08, 100);
      const edge = new THREE.Mesh(edgeGeo, edgeMat);
      edge.rotation.x = -Math.PI / 2;
      edge.position.set(side, 0.02, 0);
      scene.add(edge);
    }

    // === BUILDINGS (Amman Skyline) ===
    const buildings = new THREE.Group();
    const buildingConfigs = [
      { w: 3, h: 12, d: 3, c: 0x1a3a52, x: -8, z: -10 },
      { w: 2.5, h: 18, d: 2.5, c: 0x0d2137, x: -5, z: -15 },
      { w: 4, h: 8, d: 3, c: 0x1a3a52, x: -12, z: -8 },
      { w: 2, h: 22, d: 2, c: 0x102a43, x: -4, z: -20 },
      { w: 3.5, h: 15, d: 3, c: 0x1a3a52, x: 8, z: -12 },
      { w: 2, h: 20, d: 2, c: 0x0d2137, x: 5, z: -18 },
      { w: 4, h: 10, d: 3.5, c: 0x1a3a52, x: 12, z: -8 },
      { w: 3, h: 25, d: 3, c: 0x102a43, x: 6, z: -22 },
      { w: 2.5, h: 14, d: 2.5, c: 0x1a3a52, x: -10, z: -18 },
      { w: 3, h: 16, d: 2, c: 0x0d2137, x: 10, z: -16 },
      // Iconic tower (AmmanSmart HQ)
      { w: 3, h: 30, d: 3, c: 0x0a1a2f, x: 0, z: -25 },
    ];

    buildingConfigs.forEach(cfg => {
      const b = createBuilding(cfg.w, cfg.h, cfg.d, cfg.c, cfg.x, cfg.z);
      b.scale.y = 0; // Start hidden for build animation
      buildings.add(b);
    });
    scene.add(buildings);

    // === ICONIC TOWER ANTENNA ===
    const antennaGeo = new THREE.CylinderGeometry(0.05, 0.15, 5, 8);
    const antennaMat = new THREE.MeshPhongMaterial({ color: COLORS.cyan, emissive: COLORS.cyan, emissiveIntensity: 1 });
    const antenna = new THREE.Mesh(antennaGeo, antennaMat);
    antenna.position.set(0, 32.5, -25);
    buildings.add(antenna);

    // Antenna beacon
    const beaconGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const beaconMat = new THREE.MeshPhongMaterial({ color: COLORS.neonRed, emissive: COLORS.neonRed, emissiveIntensity: 2 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(0, 35, -25);
    buildings.add(beacon);

    // === BUS (BRT) ===
    const bus = new THREE.Group();
    // Bus body
    const busBodyGeo = new THREE.BoxGeometry(1.8, 1.2, 4);
    const busBodyMat = new THREE.MeshPhongMaterial({
      color: COLORS.neonRed,
      emissive: COLORS.neonRed,
      emissiveIntensity: 0.3,
      shininess: 100,
    });
    const busBody = new THREE.Mesh(busBodyGeo, busBodyMat);
    busBody.position.y = 0.9;
    bus.add(busBody);

    // Bus roof
    const busRoofGeo = new THREE.BoxGeometry(1.6, 0.15, 3.8);
    const busRoofMat = new THREE.MeshPhongMaterial({ color: 0xcc2233 });
    const busRoof = new THREE.Mesh(busRoofGeo, busRoofMat);
    busRoof.position.y = 1.55;
    bus.add(busRoof);

    // Bus windows
    const busWinMat = new THREE.MeshPhongMaterial({
      color: 0x88ddff,
      emissive: 0x224466,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
    });
    for (let i = -1.2; i <= 1.2; i += 0.8) {
      const winGeo = new THREE.PlaneGeometry(0.5, 0.6);
      const winL = new THREE.Mesh(winGeo, busWinMat);
      winL.position.set(-0.91, 1.1, i);
      winL.rotation.y = Math.PI / 2;
      bus.add(winL);
      const winR = new THREE.Mesh(winGeo, busWinMat);
      winR.position.set(0.91, 1.1, i);
      winR.rotation.y = -Math.PI / 2;
      bus.add(winR);
    }

    // Bus headlights
    const headlightGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const headlightMat = new THREE.MeshPhongMaterial({ color: 0xffffcc, emissive: 0xffffcc, emissiveIntensity: 2 });
    for (const x of [-0.6, 0.6]) {
      const hl = new THREE.Mesh(headlightGeo, headlightMat);
      hl.position.set(x, 0.7, -2.01);
      bus.add(hl);
    }

    // Bus wheels
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16);
    const wheelMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const wheelPositions = [
      [-0.85, 0.3, -1.2], [0.85, 0.3, -1.2],
      [-0.85, 0.3, 1.2], [0.85, 0.3, 1.2],
    ];
    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(wx, wy, wz);
      wheel.rotation.z = Math.PI / 2;
      bus.add(wheel);
    });

    // "عمان الذكية" text on bus (using a colored strip)
    const stripGeo = new THREE.PlaneGeometry(3.5, 0.3);
    const stripMat = new THREE.MeshPhongMaterial({ color: COLORS.gold, emissive: COLORS.gold, emissiveIntensity: 0.5 });
    const stripL = new THREE.Mesh(stripGeo, stripMat);
    stripL.position.set(-0.91, 1.5, 0);
    stripL.rotation.y = Math.PI / 2;
    bus.add(stripL);
    const stripR = new THREE.Mesh(stripGeo, stripMat);
    stripR.position.set(0.91, 1.5, 0);
    stripR.rotation.y = -Math.PI / 2;
    bus.add(stripR);

    bus.position.set(0, 0, 30);
    scene.add(bus);

    // Bus path
    const busPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 40),
      new THREE.Vector3(0, 0, 20),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -20),
      new THREE.Vector3(0, 0, -40),
    ]);

    // === PEOPLE (simple stick figures near stations) ===
    const people = new THREE.Group();
    const personColors = [0x00b8b8, 0xc9a14b, 0xff6644, 0x44aaff, 0xaa44ff];
    for (let i = 0; i < 15; i++) {
      const personGroup = new THREE.Group();
      // Body
      const bodyGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.8, 8);
      const bodyMat = new THREE.MeshPhongMaterial({ color: personColors[i % personColors.length] });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.6;
      personGroup.add(body);
      // Head
      const headGeo = new THREE.SphereGeometry(0.15, 8, 8);
      const headMat = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.15;
      personGroup.add(head);

      const side = i % 2 === 0 ? -1 : 1;
      personGroup.position.set(
        side * (3.5 + Math.random() * 2),
        0,
        -30 + i * 5 + Math.random() * 3
      );
      people.add(personGroup);
    }
    scene.add(people);

    // === BILLBOARDS ===
    const billboards = new THREE.Group();
    const billboardPositions = [
      { x: -7, z: 5, ry: 0.3 },
      { x: 8, z: -5, ry: -0.3 },
      { x: -9, z: -15, ry: 0.2 },
      { x: 10, z: 10, ry: -0.2 },
    ];

    billboardPositions.forEach((pos, idx) => {
      const bbGroup = new THREE.Group();

      // Pole
      const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 5, 8);
      const poleMat = new THREE.MeshPhongMaterial({ color: 0x444444 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 2.5;
      bbGroup.add(pole);

      // Screen
      const screenGeo = new THREE.BoxGeometry(3, 2, 0.1);
      const screenColors = [COLORS.cyan, COLORS.neonRed, COLORS.gold, COLORS.neonBlue];
      const screenMat = new THREE.MeshPhongMaterial({
        color: 0x111122,
        emissive: screenColors[idx],
        emissiveIntensity: 0.6,
        shininess: 100,
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.y = 6;
      bbGroup.add(screen);

      // Screen border (LED frame)
      const frameMat = new THREE.MeshPhongMaterial({
        color: screenColors[idx],
        emissive: screenColors[idx],
        emissiveIntensity: 1.2,
      });
      // Top/bottom frame
      for (const fy of [5, 7]) {
        const frameGeo = new THREE.BoxGeometry(3.2, 0.06, 0.15);
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.position.y = fy;
        bbGroup.add(frame);
      }
      // Left/right frame
      for (const fx of [-1.55, 1.55]) {
        const frameGeo = new THREE.BoxGeometry(0.06, 2.1, 0.15);
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.position.set(fx, 6, 0);
        bbGroup.add(frame);
      }

      // Glow light
      const glowLight = new THREE.PointLight(screenColors[idx], 1.5, 8);
      glowLight.position.set(0, 6, 1);
      bbGroup.add(glowLight);

      bbGroup.position.set(pos.x, 0, pos.z);
      bbGroup.rotation.y = pos.ry;
      billboards.add(bbGroup);
    });
    scene.add(billboards);

    // === SMART BUILDING (Smart Bathroom/Facility) ===
    const smartBuilding = new THREE.Group();
    // Main structure
    const sbBodyGeo = new THREE.BoxGeometry(4, 3, 3);
    const sbBodyMat = new THREE.MeshPhongMaterial({
      color: 0x1a3a52,
      shininess: 60,
    });
    const sbBody = new THREE.Mesh(sbBodyGeo, sbBodyMat);
    sbBody.position.y = 1.5;
    smartBuilding.add(sbBody);

    // Glowing door
    const doorGeo = new THREE.BoxGeometry(1, 2.2, 0.05);
    const doorMat = new THREE.MeshPhongMaterial({
      color: COLORS.cyan,
      emissive: COLORS.cyan,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6,
    });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 1.1, 1.53);
    smartBuilding.add(door);

    // Card reader
    const readerGeo = new THREE.BoxGeometry(0.3, 0.4, 0.05);
    const readerMat = new THREE.MeshPhongMaterial({
      color: COLORS.gold,
      emissive: COLORS.gold,
      emissiveIntensity: 1,
    });
    const reader = new THREE.Mesh(readerGeo, readerMat);
    reader.position.set(1.2, 1.3, 1.53);
    smartBuilding.add(reader);

    // Roof with solar panels
    const roofGeo2 = new THREE.BoxGeometry(4.2, 0.1, 3.2);
    const roofMat2 = new THREE.MeshPhongMaterial({ color: 0x224466 });
    const roof2 = new THREE.Mesh(roofGeo2, roofMat2);
    roof2.position.y = 3.05;
    smartBuilding.add(roof2);

    // Solar panels
    for (let sx = -1.2; sx <= 1.2; sx += 1.2) {
      const panelGeo = new THREE.BoxGeometry(1, 0.05, 1.5);
      const panelMat = new THREE.MeshPhongMaterial({ color: 0x1a1a4e, shininess: 100 });
      const panel = new THREE.Mesh(panelGeo, panelMat);
      panel.position.set(sx, 3.2, 0);
      panel.rotation.x = -0.3;
      smartBuilding.add(panel);
    }

    // Status light
    const statusLight = new THREE.PointLight(COLORS.cyan, 2, 10);
    statusLight.position.set(0, 2, 3);
    smartBuilding.add(statusLight);

    smartBuilding.position.set(15, 0, 0);
    scene.add(smartBuilding);

    // === TOURISM SCENE (Ancient columns - Petra/Roman Theater) ===
    const tourismScene = new THREE.Group();

    // Ground platform
    const platGeo = new THREE.CylinderGeometry(12, 12, 0.3, 32);
    const platMat = new THREE.MeshPhongMaterial({ color: 0xc9a060 });
    const platform = new THREE.Mesh(platGeo, platMat);
    platform.position.y = -0.15;
    tourismScene.add(platform);

    // Roman columns in a semicircle
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI / 7) * i - Math.PI / 2 + 0.2;
      const radius = 8;
      const colGroup = new THREE.Group();

      // Column shaft
      const colGeo = new THREE.CylinderGeometry(0.4, 0.5, 7, 12);
      const colMat = new THREE.MeshPhongMaterial({ color: 0xd4b896, shininess: 30 });
      const col = new THREE.Mesh(colGeo, colMat);
      col.position.y = 3.5;
      colGroup.add(col);

      // Column base
      const baseGeo = new THREE.CylinderGeometry(0.6, 0.7, 0.5, 12);
      const base = new THREE.Mesh(baseGeo, colMat);
      base.position.y = 0.25;
      colGroup.add(base);

      // Column capital
      const capGeo = new THREE.CylinderGeometry(0.7, 0.4, 0.5, 12);
      const cap = new THREE.Mesh(capGeo, colMat);
      cap.position.y = 7.25;
      colGroup.add(cap);

      colGroup.position.set(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      );
      tourismScene.add(colGroup);
    }

    // Arch/lintel connecting columns
    const archGeo = new THREE.BoxGeometry(18, 0.6, 1.2);
    const archMat = new THREE.MeshPhongMaterial({ color: 0xc9a060 });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(0, 7.8, 0);
    arch.rotation.y = 0.2;
    tourismScene.add(arch);

    // Warm lighting for ancient scene
    const warmLight = new THREE.PointLight(0xffaa44, 3, 30);
    warmLight.position.set(0, 10, 0);
    tourismScene.add(warmLight);

    const warmLight2 = new THREE.PointLight(0xff8833, 2, 20);
    warmLight2.position.set(5, 5, 5);
    tourismScene.add(warmLight2);

    tourismScene.position.set(40, 0, 0);
    scene.add(tourismScene);

    // === STREET LIGHTS ===
    const streetLights = new THREE.Group();
    for (let z = -40; z <= 40; z += 10) {
      for (const side of [-4.5, 4.5]) {
        const lightGroup = new THREE.Group();
        const poleGeo2 = new THREE.CylinderGeometry(0.04, 0.06, 4, 8);
        const poleMat2 = new THREE.MeshPhongMaterial({ color: 0x666666 });
        const pole2 = new THREE.Mesh(poleGeo2, poleMat2);
        pole2.position.y = 2;
        lightGroup.add(pole2);

        const lampGeo = new THREE.SphereGeometry(0.2, 8, 8);
        const lampMat = new THREE.MeshPhongMaterial({
          color: 0xffffcc,
          emissive: 0xffffaa,
          emissiveIntensity: 1,
        });
        const lamp = new THREE.Mesh(lampGeo, lampMat);
        lamp.position.y = 4.1;
        lightGroup.add(lamp);

        const streetLight = new THREE.PointLight(0xffffcc, 0.5, 8);
        streetLight.position.set(0, 4, 0);
        lightGroup.add(streetLight);

        lightGroup.position.set(side, 0, z);
        streetLights.add(lightGroup);
      }
    }
    scene.add(streetLights);

    // === PARTICLES (floating data particles) ===
    const particleCount = 500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleColors = [
      new THREE.Color(COLORS.cyan),
      new THREE.Color(COLORS.gold),
      new THREE.Color(COLORS.neonBlue),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 30 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      const c = particleColors[Math.floor(Math.random() * particleColors.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    return {
      scene,
      objects: {
        buildings,
        bus,
        busPath,
        billboards,
        smartBuilding,
        tourismScene,
        ground,
        particles,
        streetLights,
        people,
      },
    };
  }, [createBuilding]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 8, 25);
    camera.lookAt(0, 5, 0);
    cameraRef.current = camera;

    // Scene
    const { scene, objects } = createScene();
    sceneRef.current = scene;
    objectsRef.current = objects;

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [createScene]);

  // Animation loop driven by scroll
  useEffect(() => {
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !objectsRef.current) return;

      const { buildings, bus, busPath, billboards, smartBuilding, tourismScene, particles, people } = objectsRef.current;
      const camera = cameraRef.current;
      const time = Date.now() * 0.001;
      const p = scrollProgress;

      // === SECTION 1: Skyline Build (0 - 0.2) ===
      const buildProgress = Math.min(1, p / 0.2);
      buildings.children.forEach((child, idx) => {
        const delay = idx * 0.06;
        const childProgress = Math.max(0, Math.min(1, (buildProgress - delay) / (1 - delay)));
        const eased = 1 - Math.pow(1 - childProgress, 3);
        child.scale.y = eased;
      });

      // === SECTION 2: Bus Movement (0.2 - 0.4) ===
      const busProgress = Math.max(0, Math.min(1, (p - 0.15) / 0.25));
      if (busProgress > 0) {
        const busPoint = busPath.getPointAt(busProgress);
        const busTangent = busPath.getTangentAt(busProgress);
        bus.position.copy(busPoint);
        bus.lookAt(busPoint.clone().add(busTangent));
      }

      // People subtle animation
      people.children.forEach((person, idx) => {
        person.position.y = Math.sin(time * 2 + idx) * 0.05;
        person.rotation.y = Math.sin(time * 0.5 + idx * 0.7) * 0.3;
      });

      // === SECTION 3: Billboards glow (0.4 - 0.6) ===
      const bbProgress = Math.max(0, Math.min(1, (p - 0.35) / 0.2));
      billboards.children.forEach((bb, idx) => {
        bb.scale.setScalar(0.5 + bbProgress * 0.5);
        bb.children.forEach(child => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshPhongMaterial) {
            child.material.emissiveIntensity = 0.3 + bbProgress * Math.sin(time * 2 + idx) * 0.5 + bbProgress * 0.7;
          }
        });
      });

      // === SECTION 4: Smart Building (0.6 - 0.8) ===
      const sbProgress = Math.max(0, Math.min(1, (p - 0.55) / 0.2));
      smartBuilding.position.x = 15 - sbProgress * 15;
      smartBuilding.rotation.y = (1 - sbProgress) * Math.PI * 0.5;

      // Door glow pulse
      const doorMesh = smartBuilding.children[1];
      if (doorMesh instanceof THREE.Mesh && doorMesh.material instanceof THREE.MeshPhongMaterial) {
        doorMesh.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.3 * sbProgress;
      }

      // === SECTION 5: Tourism (0.8 - 1.0) ===
      const tourProgress = Math.max(0, Math.min(1, (p - 0.75) / 0.25));
      tourismScene.position.x = 40 - tourProgress * 40;
      tourismScene.rotation.y = tourProgress * Math.PI * 0.1;

      // === CAMERA MOVEMENT ===
      if (p < 0.2) {
        // Skyline overview
        const cp = p / 0.2;
        camera.position.set(
          Math.sin(cp * 0.5) * 5,
          12 - cp * 4,
          30 - cp * 10
        );
        camera.lookAt(0, 8, -15);
      } else if (p < 0.4) {
        // Follow bus
        const cp = (p - 0.2) / 0.2;
        camera.position.set(
          5 + Math.sin(cp * Math.PI) * 3,
          4 + cp * 2,
          20 - cp * 30
        );
        camera.lookAt(bus.position.x, bus.position.y + 1, bus.position.z);
      } else if (p < 0.6) {
        // Billboard view
        const cp = (p - 0.4) / 0.2;
        camera.position.set(
          -8 + cp * 16,
          6 + Math.sin(cp * Math.PI) * 2,
          8 - cp * 4
        );
        camera.lookAt(0, 5, 0);
      } else if (p < 0.8) {
        // Smart building close-up
        const cp = (p - 0.6) / 0.2;
        camera.position.set(
          3 - cp * 3,
          3 + cp,
          5 - cp * 2
        );
        camera.lookAt(smartBuilding.position.x, 2, smartBuilding.position.z);
      } else {
        // Tourism panoramic
        const cp = (p - 0.8) / 0.2;
        const tourAngle = cp * Math.PI * 0.6;
        camera.position.set(
          Math.cos(tourAngle) * 15 + tourismScene.position.x,
          5 + Math.sin(cp * Math.PI) * 3,
          Math.sin(tourAngle) * 15
        );
        camera.lookAt(tourismScene.position.x, 4, 0);
      }

      // === PARTICLES ANIMATION ===
      const posAttr = particles.geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const y = posAttr.getY(i);
        posAttr.setY(i, y + Math.sin(time + i * 0.1) * 0.01);
      }
      posAttr.needsUpdate = true;
      particles.rotation.y = time * 0.02;

      rendererRef.current.render(sceneRef.current, camera);
    };

    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0"
      style={{ touchAction: 'none' }}
    />
  );
};

export default ThreeCanvas;
