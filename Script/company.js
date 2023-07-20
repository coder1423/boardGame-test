// @ts-check

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
}

/** 개별 유닛 */
export class Unit {
  /** @type {Company} */
  #company;

  get company() {
    return this.#company;
  }
}