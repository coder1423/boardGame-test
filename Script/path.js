// @ts-check

/** 좌표
 * @typedef {Object} ICoordinates
 * @property {Number} x
 * @property {Number} y
 */

/**
 * @typedef { (ctx: CanvasRenderingContext2D)=> void } IDrawing
 */

/** 지역
 * @typedef {Object} IDistrict
 * @property {Function} createNeighborhood
 * @property {ICoordinates} coordinates
 * @property {IDrawing} drawing
 * @property {Boolean} moveable
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

  /** 그냥 '그렇습니다'라고 말해. */
  getMoveable() {
    return true;
  }

  /** @param {Boolean} moveable  */
  setMoveable(moveable) {
    this.#district.moveable = moveable ;
  }

  /** *HTML*
   * @TODO 환경출력, 유닛 출력 순으로 출력하기
   * @param {CanvasRenderingContext2D} ctx
   * @param {String} line_color 16진수 RGB
   */
  drawing(ctx, line_color) {
    this.#path.drawing(ctx, line_color);
    this.#district.drawing(ctx);
  }
}

/** 유닛의 지역간 이동에 영향을 끼지는 요소 */
export class Path {
  /** 경로 생성 및 *지역 연결*
   * @param {IDistrict} starting_district 연결을 시작할 지역 객체
   * @param {IDistrict} end_district 연결할 지역 객체
   */
  constructor(starting_district, end_district) {
    this.#starting_district = starting_district;
    this.#end_district = end_district;

    this.#starting_district.createNeighborhood( new Neighborhood(this.#end_district, this) );
    this.#end_district.createNeighborhood( new Neighborhood(this.#starting_district, this) );
  }

  /** @type {IDistrict} */
  #starting_district;
  /**  @type {IDistrict} */
  #end_district;

  /** *HTML* 두 지역 사이의 연결선 그리기 
   * @param {CanvasRenderingContext2D} ctx
   * @param {String} line_color 16진수 RGB
   */
  drawing(ctx, line_color) {
    const starting_coordinates = this.#starting_district.coordinates;
    const end_coordinates = this.#end_district.coordinates;

    ctx.beginPath();
    ctx.moveTo(starting_coordinates.x, starting_coordinates.y);
    ctx.lineTo(end_coordinates.x, end_coordinates.y);
    ctx.strokeStyle = '#1a1a1a'; 
    ctx.lineWidth = line_width + 5;
    ctx.stroke();
    ctx.strokeStyle = line_color; 
    ctx.lineWidth = line_width;
    ctx.stroke();
  }
}

const line_width = 10;