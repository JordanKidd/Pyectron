var app = require('app');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();
var mainWindow = null;
app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {
    var subpy = require('child_process').spawn(__dirname +
        '\\pyectronenv\\Scripts\\python.exe', [__dirname + '\\run.py']);
    mainWindow = new BrowserWindow({width: 1024, height: 768});
    mainWindow.loadUrl('file:\\' + __dirname + '\\templates\\index.html');
    //mainWindow.loadUrl('http://localhost:5000');
    mainWindow.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
        subpy.kill('SIGINT');
    });
});
