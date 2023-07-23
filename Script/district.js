// @ts-check

/** 좌표
 * @typedef {Object} ICoordinates
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef { (ctx: CanvasRenderingContext2D, coordinates: ICoordinates, size: Number, line_width: Number, line_color: String)=> void } IDrawing
 */

/**
 * @typedef {Object} IEnvironment
 * @property {String} color 16진수 RGB
 * @property {IDrawing} drawing
 */

/** 연결된 주변 지역
 * @typedef {Object} INeighborhood
 * @property {(ctx: CanvasRenderingContext2D, line_color: String)=> void} drawing
 * @property {()=> Boolean} getMoveable
 * @property {(moveable: Boolean)=> void} setMoveable
 */

/** 
 * @typedef {Object} ICompany 
 * @property {String} color 16진수 RGB
*/

/**
 * @typedef {Object} IUnit
 * @property {ICompany} company
 * @property {IDrawing} drawing
 */

/** 지역 */
export class District {
  /** 
   * @param {IEnvironment} environment
   * @param {ICoordinates} coordinates
   */
  constructor(environment, coordinates) {
    this.#environment = environment;
    this.#coordinates = coordinates;
  }

  /** @type {IUnit[]} */
  #units = [];

  /** 지역의 유닛을 제거하고 해당 유닛 객체 반환
   * @return {IUnit}
   */
  unitRelocation() {
    return this.#units.splice(this.#선택 - 1, 1)[0];
  }
  /**
   * @param {IUnit} unit
   */
  unitPlacement(unit) {
    this.#units.push(unit);
  }

  /** @type {IEnvironment} */
  #environment;

  /** @type {INeighborhood[]} */
  #neighborhood = [];

  /** @param {INeighborhood} neighborhood */
  createNeighborhood(neighborhood) {
    this.#neighborhood.push(neighborhood);
  }

  /** @type {ICoordinates} */
  #coordinates;

  get coordinates() {
    return this.#coordinates;
  }

  /** *HTML* 캔버스에 지역정보 그리기
   * @TODO 환경출력, 유닛 출력 순으로 출력하기
   * @param {CanvasRenderingContext2D} ctx
   */
  drawing(ctx) {
    let line_color = 비활성;
    if (this.#선택 == 0) {
      line_color = 선택됨;
    }

    this.#environment.drawing(ctx, this.#coordinates, environment_size, line_width, line_color);
    this.#units.forEach( (unit, index) => {
      if (this.#선택 == index + 1) {
        line_color = 선택됨;
      } else {
        line_color = 비활성;
      }
      unit.drawing(ctx, this.#coordinates, unit_size - (index * line_width) / 2, line_width, line_color)
    } );
  }

  /**
   * @param {ICoordinates} mouse
   */
  checkMouseContact(mouse) {
    if ( environment_size >= calcTwoPointDistance(this.#coordinates, mouse) ) {
      return true;
    }
    return false;
  }

  /** 0은 지역을 의미, 1부터는 #units의 0번째부터의 인덱스.
   * @type {Number}
   */
  #선택 = -1;

  /**
   * 0은 지역을 의미, 1부터는 #units의 0번째부터의 인덱스. 
   * @param {Number} parameter 
   */
  set 선택(parameter) {
    if (parameter > this.#units.length) {
      this.#선택 = 0;
    } else {
      this.#선택 = parameter;
    }
  }
  get 선택() {
    return this.#선택;
  }

  moveable = false;

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  주변지역이이동가능한지검사(ctx) {
    this.#neighborhood.forEach(elem => {
      if (elem.getMoveable() && this.#선택 != 0) {
        elem.setMoveable(true);
        elem.drawing(ctx, 사용가능);
      } else {
        elem.setMoveable(false);
        elem.drawing(ctx, 주변지역);
      }
    })
  }

  /** *HTML*
   * @param {CanvasRenderingContext2D} ctx
   */
  지역선택(ctx) {
    this.#선택 = 0;
    this.#neighborhood.forEach(elem => {
      elem.drawing(ctx, 주변지역);
    })
    this.drawing(ctx);
  }
  /** *HTML*
   * @param {CanvasRenderingContext2D} ctx
   */
  선택해제(ctx) {
    this.#선택 = -1;
    this.#neighborhood.forEach(elem => {
      elem.drawing(ctx, 비활성);
    })
    this.drawing(ctx);
    this.#neighborhood.forEach(elem => {
      elem.setMoveable(false);
    })
  }
}

const environment_size = 30;
const unit_size = 20;
const line_width = 10;

const 비활성 = '#000000';
const 선택됨 = '#dcdcdc';
const 주변지역 = '#0094ff';
const 사용가능 = '#06b00b';

/**
 * @param {ICoordinates} point1
 * @param {ICoordinates} point2
 */
function calcTwoPointDistance(point1, point2) {
  return ((point2.x - point1.x)**2 + (point2.y - point1.y)**2)**0.5;
}