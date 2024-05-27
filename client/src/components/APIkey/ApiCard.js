import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ApiCard() {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userData = localStorage.getItem('user');

  const handleGetApiKey = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:5003/api/apikey/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request: "getApiKey" }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.apiKey) {
          setApiKey(data.apiKey);
          setMessage("API Key retrieved successfully!");
        } else {
          setMessage("Error: API key not found");
        }
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Everyone, generate your <span className="purple">SAVANA API</span> key.
            <br />
            API key is required to access the SAVANA API. Click the button below to get your API key.
          </p>
          <Form>
            <Form.Group controlId="formApiKey">
              <Form.Label>API Key</Form.Label>
              <Form.Control
                type="text"
                placeholder="API key will be displayed here"
                value={apiKey}
                readOnly
                style={{ backgroundColor: "transparent", color: "purple" }}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleGetApiKey} disabled={loading} style={{ marginTop: "10px" }}>
              {loading ? "Loading..." : "Get API Key"}
            </Button>
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
          </Form>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default ApiCard;
