import { describe, expect, it } from "vitest"

class Character {
  hasHealth(number: number) {
    return number === 1000
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

  it.todo("has level 1 when created")

  it.todo("is alive when created")
})
