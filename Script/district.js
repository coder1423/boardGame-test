/** 좌표
 * @typedef {Object} ICoordinates
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef {Object} IEnvironment
 */

/** 연결된 주변 지역
 * @typedef {Object} INeighborhood
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

  /** @type {Unit[]} */
  #units;

  /** 지역의 유닛을 제거하고 해당 유닛 객체 반환
   * @param {Number} index
   * @return {Unit}
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
   * @param {any} ctx
   */
  drawing(ctx) { // TODO 환경출력, 유닛 출력 순으로 출력하기
    this.#coordinates
  }

  /** *HTML* 자신의 좌표를 경로 그리기 시작점으로 설정
   * @param {any} ctx
   */
  moveTo(ctx) {
    this.#coordinates
  }
  /** *HTML* 자신의 좌표를 경로 그리기 도착점으로 설정 
   * @param {any} ctx
   */
  lineTo(ctx) {
    this.#coordinates
  }
}