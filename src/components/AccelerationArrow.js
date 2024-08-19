import React, { useState } from "react";
import { Button, Modal, Input, Space } from "antd";
import { Select } from "antd";

const { Option } = Select;

const AccelerationArrow = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Are you sure you want to open parachute?"
  );

  // Define the error states based on the conditions from the screenshot
  const [containerLandingRateError, setContainerLandingRateError] = useState(false);
  const [sciencePayloadLandingRateError, setSciencePayloadLandingRateError] = useState(false);
  const [containerPressureDataFailure, setContainerPressureDataFailure] = useState(false);
  const [sciencePayloadPositionDataFailure, setSciencePayloadPositionDataFailure] = useState(false);
  const [releaseFailure, setReleaseFailure] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The alert modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };


  const errorStates = [
    { squares: [true, true, true, true, true], errorCode: "<00000>", description: "Errorless Flight Status" },
    { squares: [true, true, true, true, false], errorCode: "<00001>", description: "Minor Science Payload anomaly detected" },
    { squares: [true, true, true, false, true], errorCode: "<00010>", description: "Minor release mechanism anomaly detected" },
    { squares: [true, true, true, false, false], errorCode: "<00011>", description: "Science Payload and release mechanism anomalies detected" },
    { squares: [true, true, false, true, true], errorCode: "<00100>", description: "Container descent rate deviation detected" },
    { squares: [true, true, false, true, false], errorCode: "<00101>", description: "Container descent rate deviation and Science Payload anomaly detected" },
    { squares: [true, true, false, false, true], errorCode: "<00110>", description: "Container descent rate deviation and release mechanism anomaly detected" },
    { squares: [true, true, false, false, false], errorCode: "<00111>", description: "Container descent rate, release mechanism, and Science Payload anomalies detected" },
    { squares: [true, false, true, true, true], errorCode: "<01000>", description: "Container release mechanism anomaly detected" },
    { squares: [true, false, true, true, false], errorCode: "<01001>", description: "Container release mechanism and Science Payload anomalies detected" },
    { squares: [true, false, true, false, true], errorCode: "<01010>", description: "Container release mechanism and descent rate anomalies detected" },
    { squares: [true, false, true, false, false], errorCode: "<01011>", description: "Container release mechanism, descent rate, and Science Payload anomalies detected" },
    { squares: [true, false, false, true, true], errorCode: "<01100>", description: "Container descent rate and release mechanism anomalies detected" },
    { squares: [true, false, false, true, false], errorCode: "<01101>", description: "Container descent rate, release mechanism, and Science Payload anomalies detected" },
    { squares: [true, false, false, false, true], errorCode: "<01110>", description: "Container descent rate and Science Payload position failure detected" },
    { squares: [true, false, false, false, false], errorCode: "<01111>", description: "Container descent rate, Science Payload position failure, and release mechanism anomalies detected" },
    { squares: [false, true, true, true, true], errorCode: "<10000>", description: "Science Payload position failure detected" },
    { squares: [false, true, true, true, false], errorCode: "<10001>", description: "Science Payload position failure and anomaly detected" },
    { squares: [false, true, true, false, true], errorCode: "<10010>", description: "Science Payload position failure and release mechanism anomaly detected" },
    { squares: [false, true, true, false, false], errorCode: "<10011>", description: "Science Payload position failure, release mechanism, and anomaly detected" },
    { squares: [false, true, false, true, true], errorCode: "<10100>", description: "Science Payload position failure and descent rate deviation detected" },
    { squares: [false, true, false, true, false], errorCode: "<10101>", description: "Science Payload position failure, descent rate deviation, and anomaly detected" },
    { squares: [false, true, false, false, true], errorCode: "<10110>", description: "Science Payload position failure, descent rate deviation, and release mechanism anomaly detected" },
    { squares: [false, true, false, false, false], errorCode: "<10111>", description: "Science Payload position failure, descent rate, release mechanism, and anomaly detected" },
    { squares: [false, false, true, true, true], errorCode: "<11000>", description: "Science Payload position and container release failure detected" },
    { squares: [false, false, true, true, false], errorCode: "<11001>", description: "Science Payload position and container release failure with anomaly detected" },
    { squares: [false, false, true, false, true], errorCode: "<11010>", description: "Science Payload position, container release, and descent rate failure detected" },
    { squares: [false, false, true, false, false], errorCode: "<11011>", description: "Science Payload position, container release, descent rate, and anomaly detected" },
    { squares: [false, false, false, true, true], errorCode: "<11100>", description: "Science Payload position, container release, and descent rate failure detected" },
    { squares: [false, false, false, true, false], errorCode: "<11101>", description: "Science Payload position, container release, descent rate, and anomaly detected" },
    { squares: [false, false, false, false, true], errorCode: "<11110>", description: "Science Payload position, container release, descent rate, and full anomaly detected" },
    { squares: [false, false, false, false, false], errorCode: "<11111>", description: "Total system failure detected" }
  ];

  const [selectedState, setSelectedState] = useState(errorStates[0]);

  const handleChange = (value) => {
    setSelectedState(errorStates[value]);
  };


  return (
    <>
      <div className="parachute">
        {/* Conditionally render error messages or apply styles based on error states */}
        <div className="error-states">
          {containerLandingRateError && (
            <p style={{ color: "red" }}>Error: Container Landing Rate Out of Range</p>
          )}
          {sciencePayloadLandingRateError && (
            <p style={{ color: "red" }}>Error: Science Payload Landing Rate Out of Range</p>
          )}
          {containerPressureDataFailure && (
            <p style={{ color: "red" }}>Error: Container Pressure Data Failure</p>
          )}
          {sciencePayloadPositionDataFailure && (
            <p style={{ color: "red" }}>Error: Science Payload Position Data Failure</p>
          )}
          {releaseFailure && (
            <p style={{ color: "red" }}>Error: Release Failure</p>
          )}
        </div>

        <div className="object">
          <Button type="primary" onClick={showModal}>
            Open Parachute
          </Button>
          <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            okText="OPEN PARACHUTE"
            cancelText="CANCEL"
          >
            <p>{modalText}</p>
          </Modal>
        </div>

        <div className="object">
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input defaultValue="6G4R" />
            <Button type="primary">SEND</Button>
          </Space.Compact>
        </div>

        <div style={{ padding: "20px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        {selectedState.squares.map((status, index) => (
          <div
            key={index}
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: status ? "green" : "red",
              margin: "0 5px",
            }}
          />
        ))}
      </div>
      <div>
        <h3>ERROR CODE: {selectedState.errorCode}</h3>
        <p>{selectedState.description}</p>
      </div>
      <div>
        <Select defaultValue="0" style={{ width: 300 }} onChange={handleChange}>
          {errorStates.map((state, index) => (
            <Option key={index} value={index}>
              State {index + 1}: {state.errorCode}
            </Option>
          ))}
        </Select>
      </div>
    </div>
      </div>


    </>
  );
};

export default AccelerationArrow;
