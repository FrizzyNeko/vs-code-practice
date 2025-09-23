import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
    it("converts cents into dollars", () => {
        expect(formatCurrency(2095)).toBe("20.95");
    });

    it("works with 0", () => {
        expect(formatCurrency(0)).toBe("0.00");
    });

    it("works with negative numbers", () => {
        expect(formatCurrency(-2095)).toBe("-20.95");
    });

    it("works with floats", () => {
        expect(formatCurrency(2095.5)).toBe("20.96");
    });

    it("works with floats with negative numbers", () => {
        expect(formatCurrency(-2095.5)).toBe("-20.95");
    });
});