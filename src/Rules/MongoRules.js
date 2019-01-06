class MongoRules {
  constructor(Env) {
    this.Env = Env;
    this.db = null;
    this.objectId = null;
    const mongoFramework = Env.get('MONGO_RULES', 'mongoose').toLowerCase();
    if (mongoFramework === 'mongoose') {
      const Mongoose = use('Mongoose');
      this.objectId = Mongoose.Types.ObjectId;
      if (!Mongoose) throw new Error('Error, Not found mongoose. Please install adonis-mongoose-model for continue');
      Mongoose.connection.on('error', (err) => {
        throw err;
      });
      Mongoose.connection.on('open', () => {
        this.db = Mongoose.connection.db;
      });
    }
  }

  async _uniqueFn(data, field, message, args, get) {
    const value = get(data, field);
    if (!value) return;
    const [modelName, column] = args;
    const indexAux = args.indexOf('id');
    const index = indexAux == -1 ? args.indexOf('_id') : indexAux;
    const _id = index == -1 ? undefined : args[index + 1];
    const filter = {
      [column]: value,
    };

    if (_id) filter._id = { $ne: this.objectId(_id) };

    const modelInstance = await this.db.collection(modelName).findOne(filter);

    if (modelInstance) throw message;
  }

  async _exist(data, field, message, args, get) {
    const indexAux = args.indexOf('id');
    const index = indexAux == -1 ? args.indexOf('_id') : indexAux;
    const _id = index == -1 ? undefined : args[index + 1];
    data._id = this.objectId(_id);
    const value = get(data, field);

    if (!value) return;

    const [modelName, column] = args;

    const filter = {
      [column]: value,
    };

    const modelInstance = await this.db.collection(modelName).findOne(filter);
    if (!modelInstance) throw message;
  }

  async _isValid(data, field, message, args, get) {
    const indexAux = args.indexOf('id');
    const index = indexAux == -1 ? args.indexOf('_id') : indexAux;
    let _id = index == -1 ? undefined : args[index + 1];
    if (!_id) _id = get(data, field);
    if (!this.objectId.isValid(_id)) throw message;
  }

  setUniqueRule(Validator) {
    Validator.extend('uniqueMongo', this._uniqueFn.bind(this));
  }

  setExistRule(Validator) {
    Validator.extend('existMongo', this._exist.bind(this));
  }

  setIsValidRule(Validator) {
    Validator.extend('isValidMongo', this._isValid.bind(this));
  }
}

module.exports = MongoRules;
