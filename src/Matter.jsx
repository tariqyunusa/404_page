import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { LuChevronLeft } from "react-icons/lu";

const Objects = () => {
  const SceneRef = useRef(null);
  const [boxPositions, setBoxPositions] = useState([]);
  const width = window.innerWidth;
  const height = window.innerHeight;

  const items = [
    { no: "item1", text: "Page Not Found", bg: "#251101", color: "#4b2302" },
    { no: "item2", text: "Page Not Found",bg: "#470024", color: "#110009" },
    { no: "item3", text: "Page Not Found", bg: "#5B1865", color: "#200924" },
    { no: "item5", text: "Page Not Found", bg: "#2C5784", color: "#101f30" },
    { no: "item6", text: "Page Not Found", bg: "#5688C7", color: "#131d2b" },
    { no: "item4", text: "Page Not Found", bg: "#062726", color: "#011111" },
    { no: "item7", text: "Page Not Found", bg: "#2C514C", color: "#070c0b" },
    { no: "item8", text: "Page Not Found", bg: "#576066", color: "#171a1b" },
    { no: "item9", text: "Page Not Found", bg: "#95818D", color: "#4d4248" },
    { no: "item10", text: "Page Not Found", bg: "#023618", color: "#011f0d" },
    { no: "item11", text: "Page Not Found", bg: "#F2D7EE", color: "#8f828d" },
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
          220,
          60,
          {
            label: item.no,
            chamfer: { radius: 30 },
           render: {
          
            // lineWidth: 5,
            fillStyle: item.bg
           }
          }
        );
      });
      

    const ground = Bodies.rectangle(width / 2, height, width, 1, { isStatic: true });
    const leftWall = Bodies.rectangle(0, height / 2, 1, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width, height / 2, 1, height, { isStatic: true })

    // Add all the bodies to the world
    Composite.add(engine.world, [...boxes, ground, leftWall, rightWall]);

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
            width: "250px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // color: "white",
            fontWeight: "bold",
            pointerEvents: "none",
            textAlign: "center",
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
            <div className="rect-content">
              <a className="link" href="/" style={{backgroundColor: items.color}}>
              <span style={{background: items[index].color, color:"#fff", fontFamily: "inter"}}> <LuChevronLeft /></span><p>{items[index].text}</p>
              </a>
            </div>
            
        </div>
      ))}
    </div>
  );
};

export default Objects;
