export class Character {
  private static INITIAL_LEVEL = 1

  private static INITIAL_HEALTH = 1000
  private health = Character.INITIAL_HEALTH

  constructor(private level = Character.INITIAL_LEVEL) {}

  static spawn() {
    return new Character()
  }

  static spawnAt(level: number) {
    return new Character(level)
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

  dealDamage(target: Character) {
    if (target === this) throw new Error("A character cannot damage itself.")
    if (target.isDead()) return

    let damageAmount = this.calculateDamageFor(target)

    target.health = target.health - damageAmount
  }

  private calculateDamageFor(target: Character) {
    const baseAmount = 250
    if (this.hasFiveLevelsOrLessThan(target)) {
      return baseAmount - baseAmount / 2
    }
    if (this.hasFiveLevelsOrMoreThan(target)) {
      return baseAmount + baseAmount / 2
    }
    return baseAmount
  }

  private hasFiveLevelsOrMoreThan(target: Character) {
    return this.level - target.level >= 5
  }

  private hasFiveLevelsOrLessThan(target: Character) {
    return target.level - this.level >= 5
  }

  heal() {
    if (this.isDead()) return
    this.health = Character.INITIAL_HEALTH
  }

  private isDead() {
    return !this.isAlive()
  }
}
