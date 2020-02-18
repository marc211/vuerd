# vuerd  

> ERD Editor

[![npm version](https://img.shields.io/npm/v/vuerd.svg?color=blue)](https://www.npmjs.com/package/vuerd) [![VS Marketplace version](https://vsmarketplacebadge.apphb.com/version-short/dineug.vuerd-vscode.svg?color=blue)](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode) [![GitHub](https://img.shields.io/github/license/vuerd/vuerd)](https://github.com/vuerd/vuerd/blob/master/LICENSE)

![vuerd-info](https://user-images.githubusercontent.com/45829489/73578052-08311500-44c2-11ea-88df-cfa83be54eaa.gif)
## Multiple selection
![multiple-selection](https://user-images.githubusercontent.com/45829489/73578079-14b56d80-44c2-11ea-9a55-858acdcf16dd.gif)
## SQL DDL
![sql-ddl](https://user-images.githubusercontent.com/45829489/73578092-1da63f00-44c2-11ea-941a-d83b1dbb53db.gif)
## Generator Code
![generator-code](https://user-images.githubusercontent.com/45829489/73578110-29920100-44c2-11ea-8bcb-cddaa19f2447.gif)

## Document
- [Live Demo](https://vuerd.github.io/vuerd-docs/iframe.html?id=demo-live--vuerd)  
- [vscode extension](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode)

## Prop
| Name | Type | Describe |
| --- | --- | --- |
| value | String | editor data |
| width | Number | width |
| height | Number | height |
| focus | Boolean | current focus |
| undo | Boolean | undo status |
| redo | Boolean | redo status |

## Emit
| Event | Type | Describe |
| --- | --- | --- |
| change | String | editor data |
| undo |  | undo execute |
| redo |  | redo execute |

## Component
### Install
```bash
$ yarn add vuerd
$ yarn add undo-manager
or
$ npm install vuerd
$ npm install undo-manager
```
### Usage
```js
// main.js or main.ts
import Vue from 'vue';
import Vuerd from 'vuerd';
import 'vuerd/dist/vuerd.css';
Vue.component('Vuerd', Vuerd);
```
```html
<template>
  <div class="workspace-vuerd">
    <vuerd
      :focus="true"
      :undo="undo"
      :redo="redo"
      :width="width"
      :height="height"
      :value="value"
      @change="onChange"
      @undo="onUndo"
      @redo="onRedo"
    />
  </div>
</template>

<script>
  import UndoManager from 'undo-manager'

  export default {
    name: 'DemoVuerd',
    data: () => ({
      width: 2000,
      height: 2000,
      value: '',
      undo: false,
      redo: false,
      undoManager: null
    }),
    methods: {
      onResize() {
        this.width = window.innerWidth
        this.height = window.innerHeight
      },
      callback() {
        this.undo = this.undoManager.hasUndo()
        this.redo = this.undoManager.hasRedo()
      },
      onChange(value) {
        if (this.value !== value) {
          const oldValue = this.value
          this.undoManager.add({
            undo: () => {
              this.value = oldValue
            },
            redo: () => {
              this.value = value
            },
          })
        }
        this.value = value
      },
      onUndo() {
        this.undoManager.undo()
      },
      onRedo() {
        this.undoManager.redo()
      },
    },
    created() {
      this.undoManager = new UndoManager()
      this.undoManager.setCallback(this.callback)
    },
    mounted() {
      window.addEventListener('resize', this.onResize)
      window.dispatchEvent(new Event('resize'))
      // save data load
      this.value = ''
    },
    destroyed() {
      window.removeEventListener('resize', this.onResize)
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
  }
  .workspace-vuerd {
    overflow: hidden;
    height: 100vh;
  }
</style>
```

### CDN Quick Start
```html
<!DOCTYPE html>
<html>
<head>
  <title>vuerd-core demo</title>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/vuerd/dist/vuerd.css">
  <style>
    body {
      margin: 0;
    }
    #app {
      overflow: hidden;
      height: 100vh;    
    } 
  </style>
</head>
<body>
  <div id="app">
    <vuerd
      :focus="true"
      :width="width"
      :height="height"
      :value="value"
      @change="onChange"
     />
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuerd/dist/vuerd.umd.min.js"></script>
  <script>
    const Vuerd = window['vuerd'].default
    Vue.component('Vuerd', Vuerd)
    new Vue({
      el: '#app',
      data: () => ({
        width: 2000,
        height: 2000,
        value: ''
      }),
      methods: {
        onResize() {
          this.width = window.innerWidth
          this.height = window.innerHeight
        },
        onChange(value) {
          this.value = value
          // data save
        }
      },
      mounted() {
        window.addEventListener('resize', this.onResize)
        window.dispatchEvent(new Event('resize'))
        // save data load
        this.value = ''
      },
      destroyed() {
        window.removeEventListener('resize', this.onResize)
      }
     })
  </script>
</body>
</html>
```

## Editor Action
| Name                            | Action                                                   |
| ------------------------------- | -------------------------------------------------------- |
| Multiple selection(table, memo) | Ctrl + Drag, Ctrl + Click, Ctrl + A                      |
| Multi-movement(table, memo)     | Ctrl + Drag                                              |
| Column shift                    | Drag                                                     |
| Multiple selection(column)      | Ctrl + Click, Shift + Click, Shift + Arrow key(up, down) |
| Copy&Paste(column)              | Ctrl + C, Ctrl + V                                       |
| Contextmenu                     | Right-click                                              |
| New Table                       | Alt + N                                                  |
| New Memo                        | Alt + M                                                  |
| New Column                      | Alt + Enter                                              |
| Delete(table, memo)             | Ctrl + Delete                                            |
| Delete(column)                  | Alt + Delete                                             |
| Select DataType Hint            | Arrow key(right), Click                                  |
| Move DataType Hint              | Arrow key(up, down)                                      |
| Relationship ZeroOne            | Alt + 1                                                  |
| Relationship ZeroOneN           | Alt + 2                                                  |
| Primary Key                     | Alt + K                                                  |
| Undo                            | Ctrl + Z                                                 |
| Redo                            | Ctrl + Shift + Z                                         |
| Editing                         | Enter, dblclick                                          |
| All Action Stop                 | ESC                                                      |

## License
[MIT](https://github.com/vuerd/vuerd/blob/master/LICENSE)
