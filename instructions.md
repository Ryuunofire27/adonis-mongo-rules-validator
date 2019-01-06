## Register provider

Make sure to register the provider inside `start/app.js` file.

```js
const providers = [
  ...
  'adonis-mongo-rules-validator/providers/MongoRulesProvider'
]
```

That's all 🎉

## Rules Available

### uniqueMongo

Makes sure that the value of field under validation is unique in the database.

```js

const { id } = this.ctx.params;

const rules = {
  username: `uniqueMongo:users,username,id,${id}`
}
```

rule: uniqueMongo

#### Parameters


model: Should be plural and in lowercase. Should be next to the rule.

key: The key that must be unique. Should be next to the model.

id or _id: the '_id' key to indicate that the value of the _id does not take it as reference. Should be after for the value.

value: The value for '_id' key. Should be next to the '_id' key.

### existMongo

Makes sure that the value of field under validation exist in the database.

```js

const { id } = this.ctx.params;

const rules = {
  _id: `existMongo:users,_id,${id}`,
  username: `existMongo:users,username`
}
```

#### Parameters


model: Should be plural and in lowercase. Should be next to the rule.

key: The key that must be unique. Should be next to the model.

value: The value for '_id' key. Should be next to the '_id' key.

### isValidMongo

Makes sure that the value of field under validation is a valid objectId.

```js

const { id } = this.ctx.params;

const rules = {
  _id: `isValidMongo:users,_id,${id}`
}
```

#### Parameters


model: Should be plural and in lowercase. Should be next to the rule.

id or _id: The key that must be unique. Should be next to the model.

value: The value for '_id' key. Should be next to the '_id' key.