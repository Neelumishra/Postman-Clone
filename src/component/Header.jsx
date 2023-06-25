import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
function Header() {
  const [dropdown, setDropdown] = useState("");
  const [res, setRes] = useState("");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [setParamsKey, setParamsKeySetter] = useState(null);
  const [setParamsValue, setParamsValueSetter] = useState(null);
  function handleClick() {
    if (dropdown === "GET") {
      try {
        let header = {};
        let finalurl = url + `?${setParamsKey}=${setParamsValue}`;
        header[key] = value;

        console.log(header, finalurl);
        debugger;
        fetch(finalurl, {
          method: dropdown,
          headers: header,
        })
          .then((r) => r.json())
          .then((data) => setRes(JSON.stringify(data)));
      } catch (e) {
        console.log(e);
        // throw new Error("Bad String");
      }
    } else {
      try {
        var hold = JSON.parse(body) || null;
        let header = {};
        let finalurl = url + `?${setParamsKey}=${setParamsValue}`;
        header[key] = value;

        console.log(header, finalurl);
        debugger;
        fetch(finalurl, {
          method: dropdown,
          headers: header,
          body: JSON.stringify(hold),
        })
          .then((r) => r.json())
          .then((data) => setRes(JSON.stringify(data)));
      } catch (e) {
        console.log(e);
        // throw new Error("Bad String");
      }
    }
  }
  return (
    <Container>
      <InputGroup className="m-4">
        <DropdownButton
          variant="outline-secondary"
          title={dropdown || "SELECT"}
          id="input-group-dropdown-3"
        >
          <Dropdown.Item onClick={() => setDropdown("GET")}>GET</Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdown("POST")}>
            POST
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdown("PATCH")}>
            PATCH
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdown("PUT")}>PUT</Dropdown.Item>
          <Dropdown.Item onClick={() => setDropdown("DELETE")}>
            DELETE
          </Dropdown.Item>
        </DropdownButton>
        <Form.Control onChange={(e) => setUrl(e.target.value)} />
        <Button variant="primary" onClick={handleClick}>
          Send
        </Button>
      </InputGroup>
      <Tabs
        defaultActiveKey="profile"
        id="fill-tab-example"
        className="m-4"
        variant="underline"
        fill
      >
        <Tab eventKey="home" title="Headers">
          <table>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>
                <input onChange={(e) => setKey(e.target.value)} />
              </td>
              <td>
                <input onChange={(e) => setValue(e.target.value)} />
              </td>
            </tr>
          </table>
        </Tab>
        <Tab eventKey="profile" title="Body">
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              onChange={(e) => setBody(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Tab>
        <Tab eventKey="longer-tab" title="Params">
          <table>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>
                <input onChange={(e) => setParamsKeySetter(e.target.value)} />
              </td>
              <td>
                <input onChange={(e) => setParamsValueSetter(e.target.value)} />
              </td>
            </tr>
          </table>
        </Tab>
      </Tabs>
      <div className="border" style={{ height: "200px" }}>
        {res}
      </div>
    </Container>
  );
}

export default Header;
