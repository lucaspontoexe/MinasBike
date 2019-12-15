import xlsx from 'node-xlsx';

class FileController {
  async store(req, res) {
    try {
      const { filename } = req.file;
      const processedFile = xlsx.parse(
        `${__dirname}/../../../tmp/uploads/${filename}`
      );
      return res.json(processedFile);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'failed to read the uploaded file' });
    }
  }
}

export default new FileController();
