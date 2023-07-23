// @ts-check

/** 좌표
 * @typedef {Object} ICoordinates
 * @property {Number} x
 * @property {Number} y
 */

/** 기업 */
export class Company {
  /** @param {String} color 16진수 RGB */
  constructor(color) {
    this.#color = color;
  }

  /** @type {String} 16진수 RGB */
  #color;

  /** @type {String} 16진수 RGB */
  get color() {
    return this.#color;
  }
}

/** 지역의 기업별 영향력과 자원산출 */
export class Environment {
  /** @type {Company} */
  #company;

  /** @param {String} color 16진수 RGB */
  #default_color = "#787878";

  get color() {
    if (this.#company === undefined) {
      return this.#default_color;
    }
    return this.#company.color;
  }

  produceResources() {

  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {ICoordinates} coordinates 
   * @param {Number} size 
   * @param {Number} line_width 
   * @param {String} line_color 
   */
  drawing(ctx, coordinates, size, line_width, line_color) {
    ctx.beginPath();
    ctx.strokeStyle = this.color; 
    ctx.arc(coordinates.x, coordinates.y, size, 0, Math.PI * 2);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = line_width + 5;
    ctx.stroke();
    ctx.strokeStyle = line_color; 
    ctx.lineWidth = line_width;
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

/** 개별 유닛 */
export class Unit {
  /** @param {Company} company  */
  constructor(company) {
    this.#company = company
  }

  /** @type {Company} */
  #company;

  get company() {
    return this.#company;
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {ICoordinates} coordinates
   * @param {Number} size
   * @param {Number} line_width 
   * @param {String} line_color
   */
  drawing(ctx, coordinates, size, line_width, line_color) {
    ctx.beginPath();
    ctx.arc(coordinates.x, coordinates.y, size, 0, Math.PI * 2);
    ctx.strokeStyle = '#1a1a1a'; 
    ctx.lineWidth = line_width + 5;
    ctx.stroke();
    ctx.strokeStyle = line_color; 
    ctx.lineWidth = line_width;
    ctx.stroke();
    ctx.fillStyle = this.company.color;
    ctx.fill();
  }
}