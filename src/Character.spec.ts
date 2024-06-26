import { describe, expect, it } from "vitest"
import { Character } from "./Character.js"

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

  it("character can heal", () => {
    const reaper = Character.spawn()
    const diva = Character.spawn()
    reaper.dealDamage(diva)

    diva.heal()

    expect(diva.hasHealth(1000)).toBe(true)
  })

  it("cannot revive dead characters", () => {
    const reaper = Character.spawn()
    const diva = Character.spawn()
    kill(reaper, diva)
    reaper.dealDamage(diva)

    diva.heal()

    expect(diva.isAlive()).toBe(false)
  })

  it("cannot damage itself", () => {
    const reaper = Character.spawn()

    expect(() => reaper.dealDamage(reaper)).toThrowError("A character cannot damage itself.")
  })

  it("deals 50% less damage when target is 5 levels above", () => {
    const reaper = Character.spawn()
    const diva = Character.spawnAt(6)

    reaper.dealDamage(diva)

    expect(diva.hasHealth(875)).toBe(true)
  })

  it("deals whole damage when target is 4 levels above", () => {
    const reaper = Character.spawnAt(2)
    const diva = Character.spawnAt(6)

    reaper.dealDamage(diva)

    expect(diva.hasHealth(750)).toBe(true)
  })

  it("deals 50% more damage when target is 5 levels below", () => {
    const reaper = Character.spawnAt(6)
    const diva = Character.spawn()

    reaper.dealDamage(diva)

    expect(diva.hasHealth(625)).toBe(true)
  })
})

function kill(attacker: Character, injured: Character) {
  attacker.dealDamage(injured)
  attacker.dealDamage(injured)
  attacker.dealDamage(injured)
  attacker.dealDamage(injured)
}
