## File System Access API
Sample usage of new Google Chrome feature to access file system from browser. 
It requires the newest Google Chrome version 86.0.4240.75^. 
There are some polyfills for other browsers, but it's not broadly supported yet.

Reference: [https://web.dev/file-system-access/](https://web.dev/file-system-access/)

### How it works
Serve ``index.html`` to your browser. You can use for example [http-server](https://www.npmjs.com/package/http-server).

You can load a .txt file with 'Open File' button, you can edit the content of a file and then save it.
Save File will work only for previously loaded file. Save File As will create a new file in a selected folder except system folders.

You can list files or folders in a directory with 'Open Directory' button.


Chrome will ask you to grant permissions for saving and listing directory content.