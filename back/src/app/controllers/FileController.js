import xlsx from 'node-xlsx';

class FileController {
  async store(req, res) {
    // const thefile = xlsx.parse(/tmp/uploads/36d049a3ec98d644aabaa15bbc76b092.csv);
    const workSheetsFromBuffer = xlsx.parse(
      `${__dirname}/../../../tmp/uploads/36d049a3ec98d644aabaa15bbc76b092.csv`
    );
    return res.json(workSheetsFromBuffer);
  }
}

export default new FileController();
