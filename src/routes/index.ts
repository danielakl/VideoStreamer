import * as express from 'express';
import * as fs from "fs";
import * as Path from "path";

const router: express.Router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(Path.join(__dirname, '..', '..', 'public', 'index.html'));
});

router.get('/video', (req, res) => {
    const path = Path.join(__dirname, '..', '..', 'public', 'videos', 'sample.webm');
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    let head = {
        'Content-Type': 'video/mp4'
    };

    if (range) {
        const parts = range.replace('bytes=', "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunkSize = (end-start)+1;
        const file = fs.createReadStream(path, {start, end});
        head['Content-Range'] = `bytes ${start}-${end}/${fileSize}`;
        head['Accept-Ranges'] = 'bytes';
        head['Content-Length'] = chunkSize;
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        head['Content-Length'] = fileSize;
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

export default router;