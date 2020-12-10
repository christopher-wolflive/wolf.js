# WOLF.JS API Documentation
**Alpha Status**: This project is currently in development, and therefor may change rapidly over the course of development. Please continually watch this page for updates that may impact you!

## Sample
There are two major ways to consume WOLF.JS, as a `Client` or as a `Bot`. Please read the respective sections to decide which type you will need.

### `Client`
A `Client` provides the bare necessities to interact with WOLF. It provides some things such as caching, events, and I/O for packets. In order to get started with this project type, you will need to create the following files, with their respective content.

`index.js`
```js
const { Client } = require('wolf.js');

// Async Init Function
let init = async () => {
    let client = new Client();

    // Connection Events
    client.On.Connected = () => console.log('Connected');
    client.On.Disconnected = () => console.log('Disconnected');
    client.On.Reconnected = () => console.log('Reconnected');

    // Authentication Events
    client.On.LoginSuccess = (user) => console.log('Login Success');
    client.On.LoginFailed = () => console.log('Login Failed');
    client.On.LogoutSuccess = () => console.log('Logout Success');
    client.On.LogoutFailed = () => console.log('Logout Failed');

    // I/O Based Events
    client.On.MessageRecieved = (message) => console.log('Message Recieved');
    client.On.GroupAction = (action) => console.log('Group Action');

    // Login
    await client.Login('email', 'password');
}

init();
```

### `Bot`
A `Bot` inhertis from `Client` and provides all of the base functions and properties, in addition to handling `Command`'s. In order to get started with this project type, you will need to create the following files, with their respective content.

`index.js`
```js
const { Bot, Command, GroupRole } = require('wolf.js');
const { helloWorld } = require('./Commands/Sample.js');

// Async Init Function
let init = async () => {
    let bot = new Bot();

    // Connection Events
    bot.On.Connected = () => console.log('Connected');
    bot.On.Disconnected = () => console.log('Disconnected');
    bot.On.Reconnected = () => console.log('Reconnected');

    // Authentication Events
    bot.On.LoginSuccess = (user) => console.log('Login Success');
    bot.On.LoginFailed = () => console.log('Login Failed');
    bot.On.LogoutSuccess = () => console.log('Logout Success');
    bot.On.LogoutFailed = () => console.log('Logout Failed');

    // I/O Based Events
    bot.On.MessageRecieved = (message) => console.log('Message Recieved');
    bot.On.GroupAction = (action) => console.log('Group Action');

    // Bot Based Events
    bot.On.FailedCommand = (report) => console.log('Failed Command');

    // Command Setup
    bot.AddCommands(
        new Command('!wjs', { both: helloWorld },
            new Command('help', { both: helloWorld }),
            new Command('group', { group: helloWorld },
                new Command('owner', { group: helloWorld, requiredRole: GroupRole.Owner }),
                new Command('admin', { group: helloWorld, requiredRole: GroupRole.Admin }),
                new Command('mod', { group: helloWorld, requiredRole: GroupRole.User }),
            ),
            new Command('private', { private: helloWorld })
            new Command('Both', { both: helloWorld })
        )
    );

    // Login
    await bot.Login('email', 'password');
}

init();
```

`/Commands/Sample.js`
```js
const { CommandContext } = require('wolf.js');

/**
 * @param {CommandContext} context
 */
let helloWorld = async (context) => {
    await context.ReplyText('Hello World');
};

module.exports = {
    helloWorld
};
```