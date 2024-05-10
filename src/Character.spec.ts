import { describe, expect, it } from "vitest"

class Character {
  private health = 1000

  hasHealth(health: number) {
    return health === this.health
  }

  hasLevel(level: number) {
    return level === 1
  }

  isAlive() {
    return true
  }

  dealDamage(character: Character){
    character.health = character.health - 250
  }
}

describe("Character", () => {
  it("has 1000 of health when created", () => {
    const character = new Character()

    expect(character.hasHealth(1000)).toBe(true)
  })

  it("does not has 900 of health when created", () => {
    const character = new Character()

    expect(character.hasHealth(900)).toBe(false)
  })

  it("has level 1 when created", () => {
    const character = new Character()

    expect(character.hasLevel(1)).toBe(true)
  })

  it("does not have level 1 when created", () => {
    const character = new Character()

    expect(character.hasLevel(2)).toBe(false)
  })

  it("is alive when created", () => {
    const character = new Character()

    expect(character.isAlive()).toBe(true)
  })

  it("can deal damage", () => {
    const reaper = new Character()
    const diva = new Character()

    reaper.dealDamage(diva)

    expect(diva.hasHealth(1000)).toBe(false)
  })
})
