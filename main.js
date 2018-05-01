const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

//Listen for the app to be ready
app.on('ready', function(){
    //create new window
    mainWindow = new BrowserWindow({
        //Load html file into window
        width: 350,
        height: 500,
        resizable: false
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file', 
        slashes: true
    }));    
});

