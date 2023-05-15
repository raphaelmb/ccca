import { test, expect } from 'vitest'
import StockEntry from '../../src/domain/entities/StockEntry'
import StockCalculator from '../../src/domain/entities/StockCalculator'

test("should calculate a product stock", () => {
  const stockEntries = [
    new StockEntry(1, "in",  10),
    new StockEntry(1, "out",  5),
    new StockEntry(1, "out",  2),
  ]
  const total = StockCalculator.calculate(stockEntries)
  expect(total).toBe(3)
})