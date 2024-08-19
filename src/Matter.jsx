import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { LuChevronLeft } from "react-icons/lu";

const Objects = () => {
  const SceneRef = useRef(null);
  const [boxPositions, setBoxPositions] = useState([]);
  const width = window.innerWidth;
  const height = window.innerHeight;

  const items = [
    { no: "item1", text: "Page Not Found" },
    { no: "item2", text: "Page Not Found" },
    { no: "item3", text: "Page Not Found" },
    { no: "item4", text: "Page Not Found" },
    { no: "item5", text: "Page Not Found" },
    { no: "item6", text: "Page Not Found" }
  ];

  useEffect(() => {
    // Aliases
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Events = Matter.Events;

    // Engine
    const engine = Engine.create();

    // Render
    const render = Render.create({
      element: SceneRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false
      }
    });

    // Create boxes
    const boxes = items.map((item) => {
        return Bodies.rectangle(
          Math.random() * width,
          Math.random() * height,
          250,
          60,
          {
            label: item.no,
            chamfer: { radius: 30 }, // Applying chamfer with a radius of 20
          }
        );
      });
      

    const ground = Bodies.rectangle(width / 2, height, width, 1, { isStatic: true });

    // Add all the bodies to the world
    Composite.add(engine.world, [...boxes, ground]);

    // Run the renderer
    Render.run(render);

    // Runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Update box positions on each tick
    const updatePositions = () => {
      setBoxPositions(
        boxes.map((box) => ({
          x: box.position.x,
          y: box.position.y,
          angle: box.angle
        }))
      );
    };

    Events.on(engine, "afterUpdate", updatePositions);

    // Cleanup function
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div ref={SceneRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      {boxPositions.map((pos, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) rotate(${pos.angle}rad)`,
            left: pos.x,
            top: pos.y,
            // width: "120px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            pointerEvents: "none",
            textAlign: "center",
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
            <a className="link" href="/">
           <span> <LuChevronLeft /></span>{items[index].text}
            </a>
        </div>
      ))}
    </div>
  );
};

export default Objects;
