import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { Upload, Download, Undo, Redo, Palette, Plus } from 'lucide-react';

const furnitureItems = [
    { name: 'Sofa', icon: '🛋️', image: '/assets/furniture/sofa.png' },
    { name: 'Lamp', icon: '💡', image: '/assets/furniture/lamp.png' },
    { name: 'TV', icon: '📺', image: '/assets/furniture/tv.png' },
    { name: 'Bed', icon: '🛏️', image: '/assets/furniture/bed.png' },
];

const DesignCustomizer = () => {
    const canvasRef = useRef(null);
    const fabricCanvas = useRef(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [wallColor, setWallColor] = useState('#ffffff');
    const [selectedObject, setSelectedObject] = useState(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

    useEffect(() => {
        fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
            width: 800,
            height: 600,
            backgroundColor: '#1e293b',
            preserveObjectStacking: true
        });

        fabricCanvas.current.on('selection:created', (e) => handleSelection(e));
        fabricCanvas.current.on('selection:updated', (e) => handleSelection(e));
        fabricCanvas.current.on('selection:cleared', () => {
            setSelectedObject(null);
            setRotation({ x: 0, y: 0, z: 0 });
        });

        return () => {
            fabricCanvas.current.dispose();
        };
    }, []);

    const handleSelection = (e) => {
        const obj = e.target;
        setSelectedObject(obj);
        // Extracts simulated 3D state if stored, or defaults
        setRotation(obj.get('rotation3D') || { x: 0, y: 0, z: 0 });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (f) => {
            const data = f.target.result;
            fabric.Image.fromURL(data, (img) => {
                img.scaleToWidth(fabricCanvas.current.width);
                fabricCanvas.current.setBackgroundImage(img, fabricCanvas.current.renderAll.bind(fabricCanvas.current));
            });
        };
        reader.readAsDataURL(file);
    };

    const applyWallColor = (color) => {
        setWallColor(color);
        const bgImage = fabricCanvas.current.backgroundImage;
        if (bgImage) {
            bgImage.filters = [new fabric.Image.filters.BlendColor({
                color: color,
                mode: 'tint',
                alpha: 0.2
            })];
            bgImage.applyFilters();
            fabricCanvas.current.renderAll();
            saveToHistory();
        }
    };

    const addFurniture = (src) => {
        fabric.Image.fromURL(src, (img) => {
            img.scale(0.5);
            // Add a 3D-like drop shadow
            img.set({
                shadow: new fabric.Shadow({
                    color: 'rgba(0,0,0,0.5)',
                    blur: 15,
                    offsetX: 10,
                    offsetY: 10
                }),
                baseScaleX: 0.5,
                baseScaleY: 0.5,
                rotation3D: { x: 0, y: 0, z: 0 }
            });
            fabricCanvas.current.add(img);
            fabricCanvas.current.centerObject(img);
            fabricCanvas.current.setActiveObject(img);
            saveToHistory();
        });
    };

    const updateRotation = (axis, value) => {
        const obj = fabricCanvas.current.getActiveObject();
        if (!obj) return;

        const newRotation = { ...rotation, [axis]: parseInt(value) };
        setRotation(newRotation);

        // Apply transformations to simulate 3D
        // Z-axis is standard rotation
        // X-axis is simulated via skewY and vertical scaling
        // Y-axis is simulated via skewX and horizontal scaling

        const radX = (newRotation.x * Math.PI) / 180;
        const radY = (newRotation.y * Math.PI) / 180;

        obj.set({
            angle: newRotation.z,
            skewX: newRotation.y,
            skewY: newRotation.x,
            scaleX: Math.cos(radY) * (obj.baseScaleX || 0.5),
            scaleY: Math.cos(radX) * (obj.baseScaleY || 0.5),
            rotation3D: newRotation
        });

        fabricCanvas.current.renderAll();
    };

    const handleRotationEnd = () => {
        saveToHistory();
    };

    const saveToHistory = () => {
        const json = fabricCanvas.current.toJSON();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(json);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const undo = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            fabricCanvas.current.loadFromJSON(history[newIndex], () => {
                fabricCanvas.current.renderAll();
                setHistoryIndex(newIndex);
            });
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            fabricCanvas.current.loadFromJSON(history[newIndex], () => {
                fabricCanvas.current.renderAll();
                setHistoryIndex(newIndex);
            });
        }
    };

    const exportDesign = () => {
        const dataURL = fabricCanvas.current.toDataURL({
            format: 'png',
            quality: 1
        });
        const link = document.createElement('a');
        link.download = '';
        link.href = dataURL;
        link.click();
    };

    return (
        <div className="design-customizer">
            <div className="toolbar">
                <label className="tool-btn">
                    <Upload size={20} />
                    Upload Room
                    <input type="file" onChange={handleFileUpload} hidden />
                </label>
                <button className="tool-btn" onClick={undo} title="Undo">
                    <Undo size={20} />
                </button>
                <button className="tool-btn" onClick={redo} title="Redo">
                    <Redo size={20} />
                </button>
                <div className="tool-btn color-picker-wrapper">
                    <Palette size={20} />
                    <span>Wall Color</span>
                    <input
                        type="color"
                        value={wallColor}
                        onChange={(e) => applyWallColor(e.target.value)}
                    />
                </div>
                <button className="tool-btn" onClick={exportDesign}>
                    <Download size={20} />
                    Export
                </button>
                {selectedObject && (
                    <div className="rotation-controls">
                        <div className="control-group">
                            <label>X-Axis</label>
                            <input
                                type="range" min="-45" max="45"
                                value={rotation.x}
                                onChange={(e) => updateRotation('x', e.target.value)}
                                onMouseUp={handleRotationEnd}
                            />
                        </div>
                        <div className="control-group">
                            <label>Y-Axis</label>
                            <input
                                type="range" min="-45" max="45"
                                value={rotation.y}
                                onChange={(e) => updateRotation('y', e.target.value)}
                                onMouseUp={handleRotationEnd}
                            />
                        </div>
                        <div className="control-group">
                            <label>Z-Axis</label>
                            <input
                                type="range" min="0" max="360"
                                value={rotation.z}
                                onChange={(e) => updateRotation('z', e.target.value)}
                                onMouseUp={handleRotationEnd}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="editor-container">
                <div className="furniture-panel">
                    <h3>Furniture Assets</h3>
                    <div className="furniture-grid">
                        {furnitureItems.map((item) => (
                            <div key={item.name} className="asset-card" onClick={() => addFurniture(item.image)}>
                                <div className="asset-icon">{item.icon}</div>
                                <span>{item.name}</span>
                                <Plus size={16} className="add-icon" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="canvas-wrapper">
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    );
};

export default DesignCustomizer;
