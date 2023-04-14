const {
  module1: { calculator, validations },
  renewalConditionsValidator,
} = require("./index");

describe("module1", () => {
  describe("calculator", () => {
    it("sum two numbers", () => {
      expect(calculator.sum(1, 2)).toEqual(3);
      expect(calculator.sum(2, 2)).toEqual(4);
      expect(calculator.sum(3, 2)).toEqual(5);
    });
  });

  describe("validations", () => {
    describe("policies", () => {
      it("same conditions", () => {
        const policy = {
          renewals: "si",
          renewalCondition: "mismas condiciones",
        };
        const response = {
          newAffectPremium: "0,00",
          newExemptPremium: "0,00",
          status: "V",
          renewals: "NO",
          result: "",
        };
        expect(validations.renewalConditions(policy)).toEqual(response);
      });
    });
  });
});

describe("Policy validations", () => {
  describe("renewal conditions", () => {
    it("same conditions condition", () => {
      const policy = {
        renewals: "si",
        renewalCondition: "mismas condiciones",
      };
      const response = {
        newAffectPremium: "0,00",
        newExemptPremium: "0,00",
        status: "V",
        renewals: "SI",
        result: "",
      };
      const validations = {
        areSinistersZero: jest.fn().mockReturnValue(true),
        arePremiumsEquals: jest.fn().mockReturnValue(true),
      };

      const renewalStatus = renewalConditionsValidator({
        validations,
      }).sameConditions(policy);

      expect(renewalStatus).toEqual(response);
    });

    it("Same conditions validation fail", () => {
      const policy = {
        renewals: "si",
        renewalCondition: "mismas condiciones",
      };
      const response = {
        newAffectPremium: "0,00",
        newExemptPremium: "0,00",
        status: "E",
        renewals: "NO",
        result: "No cumple por validación",
      };
      const validations = {
        areSinistersZero: jest.fn().mockReturnValue(false),
        isPaymentMethodEqual: jest.fn().mockReturnValue(false),
        arePremiumsEquals: jest.fn().mockReturnValue(true),
      };

      const renewalStatus = renewalConditionsValidator({
        validations,
      }).sameConditions(policy);

      expect(renewalStatus).toEqual(response);
    });
  });
});
