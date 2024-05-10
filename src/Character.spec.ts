import { describe, expect, it } from "vitest"

class Character {
  private static INITIAL_LEVEL = 1
  private static INITIAL_HEALTH = 1000
  private health = Character.INITIAL_HEALTH

  static spawn() {
    return new Character()
  }

  hasHealth(health: number) {
    return health === this.health
  }

  hasLevel(level: number) {
    return level === Character.INITIAL_LEVEL
  }

  isAlive() {
    return this.health > 0
  }

  dealDamage(character: Character) {
    if (character.isDead()) return
    const damageAmount = 250
    character.health = character.health - damageAmount
  }

  heal(character: Character) {
    if (character.isDead()) return
    character.health = Character.INITIAL_HEALTH
  }

  private isDead() {
    return !this.isAlive()
  }
}

describe("Character", () => {
  it("has 1000 of health when created", () => {
    const character = Character.spawn()

    expect(character.hasHealth(1000)).toBe(true)
  })

  it("does not has 900 of health when created", () => {
    const character = Character.spawn()

    expect(character.hasHealth(900)).toBe(false)
  })

  it("has level 1 when created", () => {
    const character = Character.spawn()

    expect(character.hasLevel(1)).toBe(true)
  })

  it("does not have level 1 when created", () => {
    const character = Character.spawn()

    expect(character.hasLevel(2)).toBe(false)
  })

  it("is alive when created", () => {
    const character = Character.spawn()

    expect(character.isAlive()).toBe(true)
  })

  it("can deal damage", () => {
    const reaper = Character.spawn()
    const diva = Character.spawn()

    reaper.dealDamage(diva)

    expect(diva.hasHealth(1000)).toBe(false)
  })

  it("health cannot go below 0", () => {
    const reaper = Character.spawn()
    const diva = Character.spawn()

    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)
    reaper.dealDamage(diva)

    expect(diva.hasHealth(0)).toBe(true)
  })

  it("is dead when health is 0", () => {
    const reaper = Character.spawn()
    const diva = Character.spawn()

    kill(reaper, diva)
    reaper.dealDamage(diva)

    expect(diva.isAlive()).toBe(false)
  })

  it("character can heal", () => {
    const reaper = Character.spawn()
    const diva = Character.spawn()
    const healer = Character.spawn()
    reaper.dealDamage(diva)

    healer.heal(diva)

    expect(diva.hasHealth(1000)).toBe(true)
  })

  it("cannot revive dead characters", () => {
    const reaper = Character.spawn()
    const diva = Character.spawn()
    const healer = Character.spawn()
    kill(reaper, diva)
    reaper.dealDamage(diva)

    healer.heal(diva)

    expect(diva.isAlive()).toBe(false)
  })
})

function kill(attacker: Character, injured: Character) {
  attacker.dealDamage(injured)
  attacker.dealDamage(injured)
  attacker.dealDamage(injured)
  attacker.dealDamage(injured)
}
