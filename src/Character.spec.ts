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
    return this.health > 0
  }

  dealDamage(character: Character) {
    if (character.health === 0) return
    character.health = character.health - 250
  }

  heal(character: Character) {
    if (!character.isAlive()) return
    character.health = 1000
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

  it("health cannot go below 0", () => {
    const reaper = new Character()
    const diva = new Character()

    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)

    expect(diva.hasHealth(0)).toBe(true)
  })

  it("is dead when health is 0", () => {
    const reaper = new Character()
    const diva = new Character()

    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)

    expect(diva.isAlive()).toBe(false)
  })

  it("character can heal", () => {
    const reaper = new Character()
    const diva = new Character()
    const healer = new Character()

    reaper.dealDamage(diva)

    healer.heal(diva)

    expect(diva.hasHealth(1000)).toBe(true)
  })

  it("cannot revive dead characters", () => {
    const reaper = new Character()
    const diva = new Character()
    const healer = new Character()

    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)

    healer.heal(diva)

    expect(diva.isAlive()).toBe(false)
  })
})
