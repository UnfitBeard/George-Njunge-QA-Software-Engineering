// Exercise 1: Creating a Class
//with constructor
// export class CanvasNode {
//   x :string;
//   y: string;
//   constructor(x: string, y:string) {
//     this.x = x
//     this.y = y
//   }
// }

//without constructor
export class CanvasNode {
  readonly x  = 0;
  readonly y  = 0;
}

// Exercise 2: Implementing Class Methods
export class CanvasNode2 {
  x = 0;
  y = 0;

  public move(n:number, m: number) {
    this.x = n;
    this.y = m;
  }
}

// Exercise 3: Implement a Getter
export class CanvasNode3 {
  x: number;
  y: number;

  constructor(position?: { x: number; y: number }) {
    this.x = position?.x ?? 0;
    this.y = position?.y ?? 0;
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  
  get position(){
    return {x: this.x, y: this.y}
  }
  
}
//Accessing the getter methods
const canvasNode = new CanvasNode3();
console.log(canvasNode.position.x); // 0
console.log(canvasNode.position.y); // 0


// Exercise 4: Implement a Setter
class CanvasNode4 {
  #x: number;
  #y: number;

  constructor(position?: { x: number; y: number }) {
    this.#x = position?.x ?? 0;
    this.#y = position?.y ?? 0;
  }

  // your `position` getter method here
  // set position(pos) {
  //   this.x = pos.x;
  //   this.y = pos.y;
  // }
  
  // move method as before
}

// Solution 5: Extending a Class
class Shape {
  #x: number;
  #y: number;

  constructor(options?: {x: number; y: number}) {
    this.#x = options?.x ?? 0;
    this.#y = options?.y ?? 0;
  }

  // position getter and setter methods

  move(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

}

type ViewMode = {}

class CanvasNode5 extends Shape {
  #viewMode: ViewMode;

  constructor (options?: {x: number; y: number; viewMode?: ViewMode }) {
    super(options);
    this.#viewMode = options?.viewMode ?? "visible";
  }
}