// 웹 환경의 인터페이스에만 관련된 부분은 *HTML*를 주석에 표시하였음.

// @ts-check

import { District } from "./district.js";
import { Company, Environment, Unit } from "./company.js";
import { Path } from "./path.js";

/** 화면상의 출력을 위한 x, y 좌표 */
class Coordinates {
  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  #x;
  #y;

  get x() {
    return this.#x;
  }
  get y() {
    return this.#y;
  }
}

 /** @ts-ignore @type {CanvasRenderingContext2D} */ 
 const ctx = document.getElementById('canvas').getContext("2d");
 
/** @TODO 딕셔러리로 바꿀 수 있을지 검토필요. @type {District[]} */
const district = [
  new District( new Environment(), new Coordinates(50, 700) ),
  new District( new Environment(), new Coordinates(220, 500) ),
  new District( new Environment(), new Coordinates(350, 350) ),
  new District( new Environment(), new Coordinates(650, 350) ),
  new District( new Environment(), new Coordinates(780, 500) ),

  new District( new Environment(), new Coordinates(950, 700) ),
  new District( new Environment(), new Coordinates(350, 650) ),
  new District( new Environment(), new Coordinates(650, 650) ),
]

/** @TODO 딕셔러리로 바꿀 수 있을지 검토필요. @type {Path[]} */
const path = [
  new Path(district, 0, 1),
  new Path(district, 1, 2),
  new Path(district, 2, 3),
  new Path(district, 3, 4),
  new Path(district, 4, 5),

  new Path(district, 2, 6),
  new Path(district, 2, 7),
  new Path(district, 3, 7),
  new Path(district, 1, 6),
  new Path(district, 6, 7),

  new Path(district, 7, 4),
]

/** @TODO 딕셔러리로 바꿀 수 있을지 검토필요. @type {Company[]} */
const company = [
  new Company("#66b8ff"),
]

path.forEach(elem => elem.drawing(ctx, 5));
district.forEach(elem => elem.drawing(ctx, 30, 25));