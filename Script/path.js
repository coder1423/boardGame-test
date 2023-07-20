// @ts-check

/** 지역
 * @typedef {Object} IDistrict
 * @property {Function} createNeighborhood
 * @property {Function} moveTo *HTML* 자신의 좌표를 경로 그리기 시작점으로 설정
 * @property {Function} lineTo *HTML* 자신의 좌표를 경로 그리기 도착점으로 설정 
 */

/** 연결된 주변 지역 */
class Neighborhood {
  /**
   * @param {IDistrict} district
   * @param {Path} path
   */
  constructor(district, path) {
    this.#district = district;
    this.#path = path;
  }
  /** @type {IDistrict} */
  #district;

  /** @type {Path} */
  #path;
}

/** 유닛의 지역간 이동에 영향을 끼지는 요소 */
export class Path {
  /** 경로 생성 및 *지역 연결*
   * @param {IDistrict[]} district
   * @param {Number} index1 연결을 시작할 지역 객체
   * @param {Number} index2 연결할 지역 객체
   */
  constructor(district, index1, index2) {
    this.#starting_district = district[index1];
    this.#end_district = district[index2];

    this.#starting_district.createNeighborhood( new Neighborhood(this.#end_district, this) );
    this.#end_district.createNeighborhood( new Neighborhood(this.#starting_district, this) );
  }

  /** @type {IDistrict} */
  #starting_district;
  /**  @type {IDistrict} */
  #end_district;

  /** @type {String} 16진수 RGB */
  color = "#dcdcdc";

  /** *HTML* 두 지역 사이의 연결선 그리기 
   * @param {CanvasRenderingContext2D} ctx
   * @param {Number} lineWidth 
   */
  drawing(ctx, lineWidth) {
    ctx.beginPath();
    this.#starting_district.moveTo(ctx);
    this.#end_district.lineTo(ctx);
    ctx.strokeStyle = this.color; 
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}