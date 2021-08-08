const {BrowserWindow, ipcMain, app, Menu, shell} = require('electron')


ipcMain.on('editor-reply', (event, arg) => {
  console.log(`Received reply from web page: ${arg}`);
  });


const template = [
  {
    label:'Format',
    submenu:[
      {
        label:'Toggle Bold',
        click(){
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send(
            'editor-event',
            'toggle-bold',
          )
        }
      },
      {
        label:'Toggle Italic',
        click(){
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send(
            'editor-event',
            'toggle-italic',
          )
        }
      },
      {
        label:'Toggle Strikethrough',
        click(){
          const window = BrowserWindow.getFocusedWindow();
          window.webContents.send(
            'editor-event',
            'toggle-italic',
            'toggle-strikethrough',
          )
        }
      },
    ]
  },
  {
    role: 'help',
    submenu:[
      {
        label:'About Editor Component',
        click(){
          shell.openExternal('https://simplemde.com');

        }
      }
    ]
  },
  // {
  //   label:'Debugging',
  //   submenu:[
  //     {
  //       label:'Dev Tools',
  //       role:'toggleDevTools'
  //     },
  //     { type:'separator' },
  //     {
  //       role: 'reload',
  //       accelerator:'Alt+R'
  //     },
  //     {type: 'separator'},
  //     {role: 'quit'}
  //   ]
  // },

  // {
  //   label: 'Edit',
  //       submenu: [
  //           { role: 'undo' },
  //           { role: 'redo' },
  //           { type: 'separator' },
  //           { role: 'cut' },
  //           { role: 'copy' },
  //           { role: 'paste' },
  //           { role: 'pasteandmatchstyle' },
  //           { role: 'delete' },
  //           { role: 'selectall' }
  //       ]
  // }
]




if (process.env.DEBUG){
  template.push({
    label:'Debugging',
    submenu: [
      {
        label:'DEV Tools',
        role: 'toggleDevTools'
      },

      {type:'separator'},
      {
        role:'reload',
        accelerator:'ALT+R',
      },
      {role: 'quit'}
    ]
  })
}

if(process.platform === 'win32'){
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })
}


const menu = Menu.buildFromTemplate(template)

module.exports = menu;