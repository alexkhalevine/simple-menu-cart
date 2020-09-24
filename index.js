const cors = require('cors');
const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
const port = 7000;
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const WriteTextToFileAsync = async (contentToWrite) => {
    try {
      if (process.env.NODE_ENV === 'production') {
        await fs.writeFile('admin/build/data.json', contentToWrite);
      } else {
        await fs.writeFile('admin/public/data.json', contentToWrite);
      }
    } catch(err) {
        throw new Error(`Could not write file because of ${err}`);
    }
}

app.get('/', (req, res) => res.status(200).send({ message : 'server alive' }));
app.use('/admin', express.static('admin/build'));
app.use('/preview', express.static('frontend/'));

app.use('/write', async (req, res) => {
    if (req.body) {
        try {
            const fileContent = JSON.stringify(req.body);
            await WriteTextToFileAsync(fileContent);
            return res.status(200).send( { message: 'File written successfully!' });
        } catch (err) {
            throw new Error(`Could not write file because of ${err}`);
        }
    } else {
        throw new Error('Could not write file because of body contains no data');
    }
});

// Not-found route
app.use((req, res, next) => {
    res.status(404).send({ message: 'Could not find the specified route you requested!' });
});

app.listen(port, () => console.log(`Server up and running and listening for incoming requests on port ${port}!`));
