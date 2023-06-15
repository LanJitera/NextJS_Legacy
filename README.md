## Getting Started

Prepare local enviroment

```bash
yarn initial
```

Config .env for next-auth

```
NEXTAUTH_URL="leave it as your nextjs url or custom server"
```

Config .env for authentication: the information get from our exported API project

```
NEXT_APP_CLIENT_ID=''
NEXT_APP_CLIENT_SECRET=''
```

Run on your local

```bash
npm run dev
# or
yarn dev
```

Buil production

```bash
// Please turn off ignoreBuildErrors and ignoreDuringBuilds when build project at next.config.js
typescript: {
  // !! WARN !!
  // Dangerously allow production builds to successfully complete even if
  // your project has type errors.
  // !! WARN !!
  ignoreBuildErrors: false,
}
eslint: {
  // Warning: This allows production builds to successfully complete even if
  // your project has ESLint errors.
  ignoreDuringBuilds: false,
},

yarn build
```

## Structure

```
src
   → assets (not sure but the bridge to get assets ⇒ import { assets } from ‘@asses/index’ ⇒ assets(’name of asset’)
   → pages
   → components
       → atoms
       → molecules
           → AppButton
               → AppButton
               → AppButton.style
       → organisms
       → pages
           → Home
               → Home
               → Home.style (generate style code here)
   → constants
   → models
   → states
   → services
   → utils
```

## Guildline

### 1. Update local library

- Update the code inside libraries/jitera-web-ui-library
- Increase version number in libraries/jitera-web-ui-library/package.json
- Upgrade local package

```javascript
yarn rebuild_local_libraries
```

- Go back to main source code
- Upgrade the package

```javascript
yarn install_local_libraries
```

### 2. Navigation

Supported navigation function over services/navigate

```javascript
const navigation = useNavigateService();
navigation.push();
navigation.replace();
navigation.goBack();
navigation.reload();
```

### 3. Service

Service support function based on bussiness model

How to use service for fetch data

```javascript
// Create service
const todoService = useTodoService();
// Get instance for query
const getApiTodosInstance = todoService.useGetApiTodos();
// Hooks to query data on load. It will refetch if arguments changed
const getApiTodosResult = getApiTodosInstance.useQuery(params || undefined);

const handleLoadMore = async () => {
  try {
    // Using instance to continue
    const responseGetApiTodos = await getApiTodosInstance.fetch();
    // responseGetApiTodos will have the latest data
    // getApiTodosResult also updated with latest data
  } catch (e: unknown) {}
};
// Result of query data "getApiTodosResult" alway update if it using same "getApiTodoInstance"
// Ex: "getApiTodosResult.loading" and "getApiTodosResult.data" and "getApiTodosResult.error" will automaticaly update the latest data after trigger "handleLoadMore" function
```

How to use service for mutation data

```javascript
// Create service
const todoService = useTodoService();
// Create hook data changes
const mutationPostApiTodos = todoService.mutationPostApiTodos;
// Call mution directly
const handleUpdateCreateTodo = async () => {
  try {
    const responsePostApiTodos = await todoService.postApiTodos.fetch({
      todos: { title: "[text]" },
    });
  } catch (e: unknown) {}
};
// State of mution can be get over "mutationPostApiTodos"
// mutationPostApiTodos.loading
// mutationPostApiTodos.error
// mutationPostApiTodos.data
```

### 4. Setup next/auth server

```javascript
// Setup in .env if you want to custom the next auth server or want to run it on another port.
NEXTAUTH_URL=http://localhost:3000
// Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
NEXTAUTH_SECRET=xxx
```

### 5. Check authentication info

Use below hook to check authentication info

```javascript
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
```

Or you can get anywhere

```javascript
import sessionStorage from "@utils/sessionStorage";

const authenticationInfo = sessionStorage.getAuthenticationInfo();
```

## Deployment

### Vercel

[Vercel Deployment](./docs/vercel-deployment.md)

## Environment Variable

| Key                                | Data Type | Example Value                                 | Description                                                                 |
| ---------------------------------- | --------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| NEXT_PUBLIC_ACCESS_TOKEN_THRESHOLD | number    | 120000                                        | How long access token will be expired in milliseconds.                      |
| NEXT_APP_CLIENT_ID                 | string    | randomstring                                  | Obtained from backend configuration.                                        |
| NEXT_APP_CLIENT_SECRET             | string    | randomstring                                  | Obtained from backend configuration.                                        |
| NEXT_PUBLIC_API_URL                | string    | https://api-68.review.staging.jitera.app      | API URL                                                                     |
| NEXTAUTH_URL                       | string    | https://frontend-68.review.staging.jitera.app | Canonical URL of the site.                                                  |
| NEXTAUTH_SECRET                    | string    | secret                                        | Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. |
