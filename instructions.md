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

Makes sure that the value of field under validation is not same as the defined value.

```js
const rules = {
  username: 'uniqueMongo:users,username'
}
```