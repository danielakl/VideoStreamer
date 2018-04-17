# VideoStreamer

This is a demonstration of video streaming using a Nodejs server.

## Getting Started

To run this demonstration on a testing- or development environment, follow these steps.
1. Download and install [Node.js][nodejs]
2. Install <i>typescript</i> npm module globally.
3. Download or clone this repository.
4. Install node dependencies, compile typescript and start server.

```bash
# Step 2
npm install -g typescript

# Step 3
git clone https://github.com/danielakl/VideoStreamer.git
cd VideoStreamer

# Step 4
npm install     // Install nodejs dependencies.
npm run tsc     // Compile typescript.
npm start       // Start server
```

## Built With

* [Intellij IDEA 2018 by JetBrains][intellij]

## Authors

* **Daniel Aune Klock** - *Initial work* - [danielakl][danielakl]

See also the list of [contributors][contributors] who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md][license] file for details.

## Acknowledgments

This project is heavily based off [Video stream with Node.js and HTML5][ack1videoStream].  
[Express generator][ack2expressGen] was used to generate the initial project structure.

[ack1videoStream]: https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6
[ack2expressGen]: https://expressjs.com/en/starter/generator.html
[contributors]: https://github.com/danielakl/VideoStreamer/contributors
[danielakl]: https://github.com/danielakl
[license]: LICENSE.md
[intellij]: https://www.jetbrains.com/idea/download/
[nodejs]: https://nodejs.org