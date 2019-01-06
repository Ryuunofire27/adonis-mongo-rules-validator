class MongoRules {
  constructor (Env) {
    this.Env = Env;
    this.db = null;
    const mongoFramework = Env.get('MONGO_RULES', 'mongoose').toLowerCase();
    if(mongoFramework === 'mongoose'){
      const Mongoose = use('Mongoose');
      if(!Mongoose) throw new Error('Error, Not found mongoose. Please install adonis-mongoose-model for continue');
      Mongoose.connection.on('error', (err) => {
        throw err;
      })
      Mongoose.connection.on('open', () => {
        this.db = Mongoose.connection.db;
      })
    }
    
  }

  async _uniqueFn (data, field, message, args, get) {
    const value = get(data, field)
    if (!value) return;
    const [modelName, column] = args;
    const modelInstance = await this.db.collection(modelName).findOne({ [column]: value })

    if(modelInstance) throw message;
    
  }

  async setUniqueRule (Validator) {
    Validator.extend('uniqueMongo', this._uniqueFn.bind(this));
  }
}

module.exports = MongoRules
