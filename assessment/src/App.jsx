import { useState } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import { MdArrowBackIos } from "react-icons/md";
import Sidebar from "./components/Sidebar";
import axios from "axios";
function App() {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [rowCount, setRowCount] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const schemaOptions = [
    { label: "Add schema to segment", value: "" },
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ];

  const handleAddRow = () => {
    if (selectedSchema) {
      setRowCount((prevRowCount) => [...prevRowCount, selectedSchema.value]);
      setSelectedSchema(null);
    }
  };

  const handleAddSegement = async () => {
    const segmentData = {
      segment_name: segmentName,
      schema: rowCount.map((schemaValue) => ({
        [schemaValue]: schemaOptions.find(
          (option) => option.value === schemaValue
        ).label,
      })),
    };
    let res = await axios.post("http://localhost:3001/save", segmentData);
    let result = res.data;
    console.log(result, "result");
    console.log("Segment", segmentData);
  };

  const handleRemoveRow = (index) => {
    setRowCount((prevRowCount) => prevRowCount.filter((_, i) => i !== index));
  };

  const handleSchemaChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = schemaOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedSchema(selectedOption);
  };
  return (
    <>
      <div>
        <div className="p-3 navbgcolor">
          <div className="d-flex gap-2 align-items-center  ">
            <div>
              <MdArrowBackIos color="white" />
            </div>
            <div>
              <h5 className="text-white m-0">View Audience</h5>
            </div>
          </div>
        </div>
        <div>
          <div className="h-100 p-2">
            <Button variant="outline-secondary mt-4 ml-2" onClick={handleShow}>
              Save Segment
            </Button>
          </div>
        </div>

        {show && (
          <Sidebar
            show={show}
            handleClose={handleClose}
            segmentName={segmentName}
            setSegmentName={setSegmentName}
            rowCount={rowCount}
            handleRemoveRow={handleRemoveRow}
            schemaOptions={schemaOptions}
            setSelectedSchema={setSelectedSchema}
            handleAddSegement={handleAddSegement}
            handleAddRow={handleAddRow}
            handleSchemaChange={handleSchemaChange}
            selectedSchema={selectedSchema}
            setRowCount={setRowCount}
          />
        )}
      </div>
    </>
  );
}

export default App;
