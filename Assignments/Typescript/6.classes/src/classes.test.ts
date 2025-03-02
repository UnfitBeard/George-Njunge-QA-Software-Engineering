import { CanvasNode, CanvasNode3 } from "./exerciseClasses";

// it("Should store some basic properties", () => {
//     const canvasNode = new CanvasNode();
  
//     expect(canvasNode.x).toEqual(0);
//     expect(canvasNode.y).toEqual(0);  
//     // @ts-expect-error Property is readonly
//     canvasNode.x = 10;
  
//     // @ts-expect-error Property is readonly
//     canvasNode.y = 20;
//   });

  it("Should be able to move to a new location", () => {
    const canvasNode = new CanvasNode3();
  
    expect(canvasNode.x).toEqual(0);
    expect(canvasNode.y).toEqual(0);
  
    canvasNode.move(10, 20);
  
    expect(canvasNode.x).toEqual(10);
    expect(canvasNode.y).toEqual(20);
  });

  it("Should be able to receive an initial position", () => {
    const canvasNode = new CanvasNode3({
      x: 10,
      y: 20,
    });
  
    expect(canvasNode.position).toEqual({ x: 10, y: 20 });  
  });