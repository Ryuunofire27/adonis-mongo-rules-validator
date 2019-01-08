
const { ServiceProvider } = require('@adonisjs/fold');
const MongoRules = require('../src/Rules/MongoRules');

class MongoRulesProvider extends ServiceProvider {
  /**
   * On boot
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    /**
     * Register Rules to Validator.
     */
    const Env = this.app.use('Env');
    let Validator;
    try {
      Validator = use('Validator');
    } catch (error) {
      throw new Error('Error, Not found Validator, Install @adonisjs/validator');
    }

    const mongoRules = new MongoRules(Env);
    mongoRules.setUniqueRule(Validator);
    mongoRules.setExistRule(Validator);
    mongoRules.setIsValidRule(Validator);
  }
}

module.exports = MongoRulesProvider;
