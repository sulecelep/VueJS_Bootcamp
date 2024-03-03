## Suspense

_Componentler çektiğimiz veriler yüklenince gelsin istiyorsak kullanabiliriz._

### App.vue

```js
import { onErrorCaptured, ref, defineAsyncComponent } from "@vue/runtime-core";
const err = ref(null);
const Todos = defineAsyncComponent(() => import("./components/Todos.vue"));
const Users = defineAsyncComponent(() => import("./components/Users.vue"));
onErrorCaptured((e) => {
  err.value = e;
  return true;
});
```

```html
<span v-if="err" class="error">{{ err }}</span>
<Suspense v-else>
  <template #default>
    <div>
      <Users />
      <hr />
      <Todos />
    </div>
  </template>
  <template #fallback>
    <div>Loading ....</div>
  </template>
</Suspense>
```

### Todos.vue

```js
import { ref } from "vue";

const todoList = ref([]);
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json())
  .then((json) => {
    todoList.value = json;
    //isLoad.value = true;
  });
```

```html
<h1>todos</h1>
<ul>
  <li v-for="todo in todoList" :key="todo.id">{{ todo.title }}</li>
</ul>
```

### Users.vue

```js
import { ref } from "vue";
const userList = ref([]);
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => {
    userList.value = json;
  });
```

```html
<h1>users</h1>
<ul>
  <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
</ul>
```

## Teleport

_Belirttiğimiz bir lokasyonda bölümde bir içeriği göstermek. İçeriği ne olursa olsun bilgi göstermeye yarar._

_Modalların kullanıldığı sayfadaki stylingden etkileniği durumlarda kullanılır._
_Yani bir hedefe html kod basmaya yarar. Html Raw gibi düşünebiliriz._

## Namespaced Components

_Kullanılan html elementlerini proje bazında kullanabilmek için standardize edebilmeye yarar._

### App.vue

```html
<template>
  <Form.Label>
    Başlık
    <Form.Input />
  </Form.Label>

  <Form.Label>
    Kategori
    <Form.Select />
  </Form.Label>
</template>
```

```js
import * as Form from "./components/form";
```

### Forms Klasöründeki Element Componentleri

#### Input.vue

```html
<template>
  <slot />
  <input type="text" />
</template>
```

#### Label.vue

```html
<template>
  <slot />
</template>
```

#### Select.vue

```html
<template>
  <select>
    <option value="1">Opt 1</option>
    <option value="2">Opt 2</option>
    <option value="3">Opt 3</option>
    <option value="4">Opt 4</option>
  </select>
</template>
```

### form.js
````js
export { default as Input} from "./Forms/Input.vue";
export { default as Select} from "./Forms/Select.vue";
export { default as Label} from "./Forms/Label.vue";
````
