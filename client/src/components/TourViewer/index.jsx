import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const projects = [
    { id: 1, title: 'Modern Living Room', image: '/assets/360/living_room.png', details: 'High-end residential project with open floor plan.' },
    { id: 2, title: 'Executive Office', image: '/assets/360/office.png', details: 'Professional commercial space with premium finishes.' },
    { id: 3, title: 'Nexa Infrastructure', image: '/assets/360/nexa.png', details: 'Custom 360° visualization for the Nexa project.' },
];

const TourViewer = () => {
    const containerRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(projects[0]);
    const [isAutoRotating, setIsAutoRotating] = useState(true);
    const [zoom, setZoom] = useState(75);

    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const sphereRef = useRef(null);
    const frameIdRef = useRef(null);

    // Mouse control state
    const isDragging = useRef(false);
    const previousMousePosition = useRef({ x: 0, y: 0 });
    const lon = useRef(0);
    const lat = useRef(0);
    const target = useRef(new THREE.Vector3());

    const loadTexture = (url) => {
        if (!sphereRef.current) return;

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            url,
            (texture) => {
                if (sphereRef.current) {
                    const material = sphereRef.current.material;
                    if (material.map) material.map.dispose();
                    material.map = texture;
                    material.color.set(0xffffff);
                    material.needsUpdate = true;
                }
            },
            undefined,
            (err) => console.error(`Error loading texture ${url}:`, err)
        );
    };

    useEffect(() => {
        if (!containerRef.current) return;

        // Force clear container
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        const width = containerRef.current.clientWidth || 800;
        const height = containerRef.current.clientHeight || 600;

        sceneRef.current = new THREE.Scene();
        cameraRef.current = new THREE.PerspectiveCamera(zoom, width / height, 1, 1100);

        try {
            rendererRef.current = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: true
            });
            rendererRef.current.setPixelRatio(window.devicePixelRatio);
            rendererRef.current.setSize(width, height);
            containerRef.current.appendChild(rendererRef.current.domElement);
        } catch (e) {
            console.error("WebGL Initialization Failed", e);
            return;
        }

        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({ color: 0x222222 });
        sphereRef.current = new THREE.Mesh(geometry, material);
        sceneRef.current.add(sphereRef.current);

        loadTexture(selectedProject.image);

        const handleMouseDown = (e) => {
            isDragging.current = true;
            previousMousePosition.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        const handleMouseMove = (e) => {
            if (isDragging.current) {
                const deltaX = e.clientX - previousMousePosition.current.x;
                const deltaY = e.clientY - previousMousePosition.current.y;
                lon.current -= deltaX * 0.15;
                lat.current += deltaY * 0.15;
                lat.current = Math.max(-85, Math.min(85, lat.current));
            }
            previousMousePosition.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            cameraRef.current.aspect = w / h;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(w, h);
        };

        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);
            if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

            // Auto-rotation
            if (isAutoRotating && !isDragging.current) {
                lon.current += 0.05;
            }

            // Zoom sync
            if (cameraRef.current.fov !== zoom) {
                cameraRef.current.fov = zoom;
                cameraRef.current.updateProjectionMatrix();
            }

            const phi = THREE.MathUtils.degToRad(90 - lat.current);
            const theta = THREE.MathUtils.degToRad(lon.current);
            target.current.x = 500 * Math.sin(phi) * Math.cos(theta);
            target.current.y = 500 * Math.cos(phi);
            target.current.z = 500 * Math.sin(phi) * Math.sin(theta);

            cameraRef.current.lookAt(target.current);
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };

        const canvas = rendererRef.current.domElement;
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        animate();

        return () => {
            cancelAnimationFrame(frameIdRef.current);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);

            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
            if (containerRef.current && canvas) {
                containerRef.current.removeChild(canvas);
            }
            geometry.dispose();
            material.dispose();
            if (material.map) material.map.dispose();
        };
    }, [isAutoRotating, zoom]); // Re-init on persistent state change or handle inside animate

    // Separate effect for texture to avoid full re-init
    useEffect(() => {
        if (sphereRef.current) {
            loadTexture(selectedProject.image);
        }
    }, [selectedProject]);

    return (
        <div className="tour-viewer">
            <div ref={containerRef} className="panorama-container" style={{ width: '100%', height: '100%', minHeight: '600px', position: 'relative' }}>
                <div className="viewer-controls">
                    <button
                        className={`control-btn ${isAutoRotating ? 'active' : ''}`}
                        onClick={() => setIsAutoRotating(!isAutoRotating)}
                        title={isAutoRotating ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
                    >
                        {isAutoRotating ? '⏸️' : '▶️'}
                    </button>
                    <div className="zoom-controls">
                        <button className="control-btn" onClick={() => setZoom(Math.max(30, zoom - 5))} title="Zoom In">➕</button>
                        <button className="control-btn" onClick={() => setZoom(Math.min(100, zoom + 5))} title="Zoom Out">➖</button>
                        <button className="control-btn" onClick={() => setZoom(75)} title="Reset Zoom">🔄</button>
                    </div>
                </div>
            </div>

            <div className="project-sidebar">
                <h2>Our Projects</h2>
                <div className="project-list">
                    {projects.map((p) => (
                        <div
                            key={p.id}
                            className={`project-card ${selectedProject.id === p.id ? 'active' : ''}`}
                            onClick={() => setSelectedProject(p)}
                        >
                            <h3>{p.title}</h3>
                            <p>{p.details}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TourViewer;
