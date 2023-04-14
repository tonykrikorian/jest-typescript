import PolicyValidator from "./index";

describe("module3", () => {
  describe("Policy Validations", () => {
    it("Validate same conditions", () => {
      const policy = {
        renewals: "si",
        renewalCondition: "mismas condiciones",
        state: "vigente",
      };

      const response = {
        renewals: "si",
        status: "V",
        newAffectPremium: "0,00",
        newExemptPremium: "0,00",
        results: "",
      };

      const validations = {
        arePremiumsEquals: jest.fn().mockReturnValue(true),
        areSinisitersEqualToZero: jest.fn().mockReturnValue(true),
      };

      const policyValidator = new PolicyValidator(validations);

      expect(policyValidator.sameConditions(policy)).toEqual(response);
    });

    it("Validate same conditions validations dont pass", () => {
      const policy = {
        renewals: "si",
        renewalCondition: "mismas condiciones",
        state: "vigente",
      };

      const response = {
        renewals: "no",
        status: "E",
        newAffectPremium: "0,00",
        newExemptPremium: "0,00",
        results: "La poliza no puede ser renovada",
      };

      const validations = {
        arePremiumsEquals: jest.fn().mockReturnValue(false),
        areSinisitersEqualToZero: jest.fn().mockReturnValue(true),
      };

      const policyValidator = new PolicyValidator(validations);

      expect(policyValidator.sameConditions(policy)).toEqual(response);
    });

    it("Validate Aumento", () => {});
  });
});
