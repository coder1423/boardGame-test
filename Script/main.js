// 웹 환경의 인터페이스에만 관련된 부분은 *HTML*를 주석에 표시하였음.

// @ts-check

/** 화면상의 출력을 위한 x, y의 좌표쌍 */
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

/** 최대와 값을 가진 점수 */
class Point {
  /**
   * @param {Number} max
   * @param {Number} value
   */
  constructor(max, value=max) {
    this.#max = max;
    this.value = value;
  }
  #max;

  /** @type {Number} */
  #value;

  get value() {
    return this.#value;
  }

  /** @param {Number} parameter */
  set value(parameter) {
    this.#value = Math.min(this.#max, parameter);
  }
}

/** 기업 */
class Company {
  /** @param {String} color 16진수 RGB */
  constructor(color) {
    this.#color = color;
  }

  /** @type {Point} */
  #resources;

  /** @type {String} 16진수 RGB */
  #color;
}

/** 연결된 주변 지역 */
class Neighborhood {
  /**
   * @param {District} district
   * @param {Path} path
   */
  constructor(district, path) {
    this.#district = district;
    this.#path = path;
  }
  /** @type {District} */
  #district;

  /** @type {Path} */
  #path;
}

/** 유닛의 지역간 이동에 영향을 끼지는 요소 */
class Path {
  /**
  * 경로 생성 및 *지역 연결*
  * @param {District[]} district
  * @param {Number} index1 연결을 시작할 지역의 인덱스
  * @param {Number} index2 연결할 지역의 인덱스
  */
  constructor(district, index1, index2) {
    this.#starting_district = district[index1];
    this.#end_district = district[index2];

    this.#starting_district.createNeighborhood( new Neighborhood(this.#end_district, this) );
    this.#end_district.createNeighborhood( new Neighborhood(this.#starting_district, this) );
  }

  /** @type {District} */
  #starting_district;
  /**  @type {District} */
  #end_district;

  /** *HTML* 두 지역 사이의 연결선 그리기 */
  drawing() {
    this.#starting_district.moveTo();
    this.#end_district.lineTo();
  }
}

/** 지역의 기업별 영향력과 자원산출 */
class Environment {
  /** @param {String} color 16진수 RGB */
  constructor(color) {
    this.#color = color;
  }

  /** @type {String} 16진수 RGB */
  #color;

  /** @type {Company} */
  #company;

  produceResources() {

  }
}

/** 개별 유닛 */
class Unit {
  /** @type {Company} */
  #company;
}

/** 지역 */
class District {
  /** 
   * @param {Environment} environment
   * @param {Coordinates} coordinates
   */
  constructor(environment, coordinates) {
    this.#environment = environment;
    this.#coordinates = coordinates;
  }

  /** @type {Unit[]} */
  #units;

  /**
  * 지역의 유닛을 제거하고 해당 유닛 객체 반환
  * @param {Number} index
  * @return {Unit}
  */
  unitRelocation(index=0) {
    return this.#units.splice(index, 1)[0];
  }

  /** @type {Environment} */
  #environment;

  /** @type {Neighborhood[]} */
  #neighborhood;

  /** @param {Neighborhood} neighborhood */
  createNeighborhood(neighborhood) {
    this.#neighborhood.push(neighborhood);
  }

  /**
   * @type {Coordinates}
   */
  #coordinates;

  /** *HTML* 캔버스에 지역정보 그리기 */
  drawing() { // TODO 환경출력, 유닛 출력 순으로 출력하기
    this.#coordinates
  }

  /** *HTML* 자신의 좌표를 경로 그리기 시작점으로 설정 */
  moveTo() {
    this.#coordinates
  }
  /** *HTML* 자신의 좌표를 경로 그리기 도착점으로 설정 */
  lineTo() {
    this.#coordinates
  }
}

/** @type {District[]} */
const district = [];

// @ts-ignore
const ctx = document.getElementById('canvas').getContext("2d");