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
  new Path(district[0], district[1]),
  new Path(district[1], district[2]),
  new Path(district[2], district[3]),
  new Path(district[3], district[4]),
  new Path(district[4], district[5]),

  new Path(district[2], district[6]),
  new Path(district[2], district[7]),
  new Path(district[3], district[7]),

  new Path(district[1], district[6]),
  new Path(district[6], district[7]),
  new Path(district[7], district[4]),
]

/** @TODO 딕셔러리로 바꿀 수 있을지 검토필요. @type {Company[]} */
const company = [
  new Company("#66b8ff"),
]
district[0].unitPlacement(new Unit(company[0]));
district[0].unitPlacement(new Unit(company[0]));
district[0].unitPlacement(new Unit(company[0]));

const canvas = document.getElementById('canvas');
/** @ts-ignore @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");


path.forEach(elem => elem.drawing(ctx, '#000000'));
district.forEach(elem => elem.drawing(ctx));

/** @type {District|null} */
let selected_district = null;

/** @param {any} event */
function eventMouseClick(event) {
  if (event.target.id == 'canvas') {
    // @ts-ignore
    const weight = 1000 / canvas.offsetWidth;
    const click_district = district.find( elem => elem.checkMouseContact(
      new Coordinates(event.offsetX * weight, event.offsetY * weight)
    ));

    if (click_district !== undefined) {
      if (selected_district !== null) {
        if (selected_district === click_district) { // 선택된 지역 재선택
          selected_district.선택 += 1;
          selected_district.주변지역이이동가능한지검사(ctx);
          selected_district.drawing(ctx);
          return;
        }
        if (selected_district.선택 > 0 && click_district.moveable) { // 유닛이동
          click_district.unitPlacement( selected_district.unitRelocation() );
        }
        selected_district.선택해제(ctx); // 선택지역변경
      } // 지역선택
      selected_district = click_district;
      selected_district.지역선택(ctx);
      return;
    } // 선택한 지역 없음
    selected_district?.선택해제(ctx);
    selected_district = null;
    return;
  }
}

window.addEventListener('mousedown', eventMouseClick);