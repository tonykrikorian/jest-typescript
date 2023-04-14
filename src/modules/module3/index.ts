export default class PolicyValidator {
  constructor(private readonly validations: any) {}

  public sameConditions(policy: any) {
    if (
      policy.renewals === "si" &&
      policy.renewalCondition === "mismas condiciones" &&
      this.validations.arePremiumsEquals() &&
      this.validations.areSinisitersEqualToZero()
    ) {
      return {
        renewals: "si",
        status: "V",
        newAffectPremium: "0,00",
        newExemptPremium: "0,00",
        results: "",
      };
    }
    return {
      renewals: "no",
      status: "E",
      newAffectPremium: "0,00",
      newExemptPremium: "0,00",
      results: "La poliza no puede ser renovada",
    };
  }
}
