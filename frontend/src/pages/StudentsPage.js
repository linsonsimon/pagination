import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

import "./StudentPage.css";

const StudentsPage = () => {
  const [students, setStudents] = useState("");
  const [filter, setFilter] = useState([]);
  const [page, setpage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [config, setConfig] = useState(null);
  const [params, setParams] = useState(new URLSearchParams());
  const [nameb, setNameb] = useState(0);
  const [marksb, setMarksb] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const limitRange = [10, 25, 50, 100];

  const fetchstudents = async (param) => {
    try {
      console.log(config);
      const res = await axios.get(`http://localhost:8000/students`, config);

      console.log(res.data.students);
      setStudents(res.data.students);
      setTotalPage(res.data.totalPage);
      // console.log(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateConfig = () => {
    let config1;

    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (filter.length != 0) params.append(filter[0], filter[1]);

    config1 = {
      params: params,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };

    setConfig(config1);
  };

  useEffect(() => {
    updateConfig();
  }, [filter, page, limit]);

  useEffect(() => {
    fetchstudents();
  }, [config]);

  return (
    <div>
      <div style={{ height: "80vh", overflowX: "scroll", padding: "1px" }}>
        <table
          style={{
            width: "100%",
          }}
        >
          <tbody>
            <tr>
              <th>id</th>
              <th>
                <div style={{ display: "flex" }}>
                  <label>name</label>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <IoMdArrowDropup
                      onClick={() => {
                        setFilter(["asc", 0]);
                        setNameb(-1);
                        setMarksb(0);
                      }}
                      style={{
                        backgroundColor: nameb == -1 ? "red" : "inherit",
                      }}
                    />
                    <IoMdArrowDropdown
                      onClick={() => {
                        setFilter(["desc", 0]);
                        setNameb(1);
                        setMarksb(0);
                      }}
                      style={{
                        backgroundColor: nameb == 1 ? "red" : "inherit",
                      }}
                    />
                  </div>
                </div>
              </th>
              <th>
                <div style={{ display: "flex" }}>
                  <lable>totalMarks</lable>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <IoMdArrowDropup
                      onClick={() => {
                        setFilter(["asc", 1]);
                        setMarksb(-1);
                        setNameb(0);
                      }}
                      style={{
                        backgroundColor: marksb == -1 ? "red" : "inherit",
                      }}
                    />
                    <IoMdArrowDropdown
                      onClick={() => {
                        setFilter(["desc", 1]);
                        setMarksb(1);
                        setNameb(0);
                      }}
                      style={{
                        backgroundColor: marksb == 1 ? "red" : "inherit",
                      }}
                    />
                  </div>
                </div>
              </th>
            </tr>
            {students &&
              students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.totalMarks}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <select value={limit} onChange={(e) => setLimit(e.target.value)}>
          {limitRange &&
            limitRange.map((lim) => <option value={lim}>{lim}</option>)}
        </select>
        {page === 1 ? (
          <button disabled>
            <IoArrowBack />
          </button>
        ) : (
          <button onClick={() => setpage(page - 1)}>
            <IoArrowBack />
          </button>
        )}
        <label>{page}</label>

        {page === totalPage ? (
          <button disabled>
            <IoArrowForward />
          </button>
        ) : (
          <button onClick={() => setpage(page + 1)}>
            <IoArrowForward />
          </button>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
