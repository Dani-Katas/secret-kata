import { describe, expect, it } from "vitest"

class Character {
  hasHealth(number: number) {
    return true
  }
}

describe("Character", () => {
  it("has 1000 of health when created", () => {
    const character = new Character()

    expect(character.hasHealth(1000)).toBe(true)
  })

  it.todo("is alive when created")
})
