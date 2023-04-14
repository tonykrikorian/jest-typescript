const module1 = {
  calculator: {
    sum: (a, b) => a + b,
  },
  validations: {
    renewalConditions: (policy) => {
      if (
        policy.renewals === "si" &&
        policy.renewalCondition === "mismas condiciones"
      ) {
        return {
          newAffectPremium: "0,00",
          newExemptPremium: "0,00",
          status: "V",
          renewals: "NO",
          result: "",
        };
      }
    },
  },
};

const renewalConditionsValidator = ({ validations }) => ({
  sameConditions: (policy) => {
    if (
      policy.renewals === "si" &&
      policy.renewalCondition === "mismas condiciones"
    ) {
      const { areSinistersZero, arePremiumsEquals } = validations;

      if (arePremiumsEquals() && areSinistersZero()) {
        return {
          newAffectPremium: "0,00",
          newExemptPremium: "0,00",
          status: "V",
          renewals: "SI",
          result: "",
        };
      } else {
        return {
          newAffectPremium: "0,00",
          newExemptPremium: "0,00",
          status: "E",
          renewals: "NO",
          result: "No cumple por validación",
        };
      }
    }
  },
});

module.exports = {
  module1,
  renewalConditionsValidator,
};
