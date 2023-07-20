// @ts-check

/** 좌표
 * @typedef {Object} ICoordinates
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef {Object} IEnvironment
 * @property {String} color 16진수 RGB
 */

/** 연결된 주변 지역
 * @typedef {Object} INeighborhood
 */

/** 
 * @typedef {Object} ICompany 
 * @property {String} color 16진수 RGB
*/

/**
 * @typedef {Object} IUnit
 * @property {ICompany} company
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
   * @param {Number} index
   * @return {IUnit}
   */
  unitRelocation(index=0) {
    return this.#units.splice(index, 1)[0];
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

  /** *HTML* 캔버스에 지역정보 그리기
   * @TODO 환경출력, 유닛 출력 순으로 출력하기
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} environment_size 환경출력크기
   * @param {Number} unit_size 유닛출력크기
   */
  drawing(ctx, environment_size, unit_size) {
    ctx.beginPath();
    ctx.strokeStyle = this.#environment.color; 
    ctx.arc(this.#coordinates.x, this.#coordinates.y, environment_size, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = this.#environment.color;
    ctx.fill();

    if (this.#units.length > 0) {
      ctx.arc(this.#coordinates.x, this.#coordinates.y, unit_size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = this.#units[0].company.color;
      ctx.fill();
    }
  }

  /** *HTML* 자신의 좌표를 경로 그리기 시작점으로 설정
   * @param {CanvasRenderingContext2D} ctx
   */
  moveTo(ctx) {
    ctx.moveTo(this.#coordinates.x, this.#coordinates.y);
  }
  /** *HTML* 자신의 좌표를 경로 그리기 도착점으로 설정 
   * @param {CanvasRenderingContext2D} ctx
   */
  lineTo(ctx) {
    ctx.lineTo(this.#coordinates.x, this.#coordinates.y);
  }
}