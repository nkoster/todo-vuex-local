# todo-vuex-local

Todo skeleton, with vuex and local storage, and sync to remote store.

This skeleton is shamelessly inspired by Brads' Vuex [youtube](https://www.youtube.com/watch?v=5lVQgZzLMHc) crash course.

Original code: https://github.com/bradtraversy/vuex_todo_manager

I've replaced the JSON fake API for local storage instead, and sync that to a remote storage.

My goal is to keep stuff as simple as posible.

These are my steps to get the thing running:

```
sudo npm i -g @vue/cli
git clone https://github.com/nkoster/todo-vuex-local
cd todo-vuex-local
npm i
./node_modules/nodemon/bin/nodemon.js app.js &
vue ui
```

Check the UI page, import the ```todo-vuex-local``` directory as a project, and start the "serve task" for the project.
In the "output" display, you'll see the localhost URL.