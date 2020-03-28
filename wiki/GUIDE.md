# Style

- Use [optional chaining](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining) instead of lodash or truthy/falsy checks
- Unless you have to bind your type to code, always use `interfaces` over `class`
- Unless you have to use `implement` on a `class`, always use `type` over `interfaces`

### `type` over `interface`

Types are composable

```typescript
enum Rights {
  none = 0,
  read = 1,
  write = 2,
  exec = 3,
  admin = 5,
}

type UserRights = Rights.read | Rights.write | Rights.exec

type User = {
  username: string
  email: string
  rights: Rights
}

type Admin = User & {
  rights: Rights.admin
}

type Guess = User & {
  rights: Rights.read
}

function login(user: User) {}
function readLog(user: Admin) {}
function addAdmin(user: Admin) {}
function banUser(user: Admin) {}
function addUser(user: User & { rights: Rights.write }, accessLevel: UserRights) {}
```
