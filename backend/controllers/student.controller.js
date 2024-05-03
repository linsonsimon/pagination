import students from "../userdata.json" assert { type: "json" };
import { compareasc, comparedesc } from "../utils/compare.js";

const getStudents = async (req, res) => {
  try {
    let a = ["name", "totalMarks"];
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const asc = req.query.asc ? req.query.asc : null;
    const desc = req.query.desc ? req.query.desc : null;
    let stud = "";

    if (asc !== null && desc !== null) {
      return res.status(404).json({ message: "cant have both asc and desc" });
    }

    if (asc !== null) {
      if (asc > a.length) {
        return res.status(404).json({ message: "Invalid asc parameters" });
      } else {
        let dem = a[asc];
        stud = students.sort((a, b) => compareasc(a, b, dem));
      }
    }

    if (desc !== null) {
      if (desc > a.length) {
        return res.status(404).json({ message: "Invalid desc parameters" });
      } else {
        let dem = a[desc];
        stud = students.sort((a, b) => comparedesc(a, b, dem));
      }
    }
    const totalPage = students.length / limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (stud !== "") {
      res.status(200).json(stud.slice(startIndex, endIndex));
    } else
      res
        .status(200)
        .json({ students: students.slice(startIndex, endIndex), totalPage });
  } catch (error) {
    res.status(500).json({ mesage: "something went wrong" });
  }
};

export { getStudents };
