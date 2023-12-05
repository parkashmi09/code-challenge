import React, { useState, useEffect } from "react";
import {
  Button,
  CheckboxInput,
  CheckboxLabel,
  Container,
  FormGroup,
  Input,
  Label,
  ParentWrapper,
} from "./StyledComponent";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const FormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sectors, setSectors] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({
    name: "",
    sectors: "",
    agreeTerms: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSectors = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/selectors");
      if (response) {
        setSectors(response?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  const createUser = async (payload) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users",
        payload
      );

      if (response.status === 201) {
        setIsLoading(false);
        const { user, token } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("something Went Wrong!");
    }
  };

  const getDropDowns = () => {
    const result = [];

    sectors?.forEach((group) => {
      const groupName = group.name;

      group.subGroups.forEach((subGroup) => {
        const key = subGroup.name;

        result.push({
          group: groupName,
          key: key,
        });
      });
    });
    return result;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = {};

    if (step === 1) {
      if (!name.trim()) {
        validationErrors.name = "Name is required";
      }

      if (selectedSectors.length === 0) {
        validationErrors.sectors = "Sectors are required";
      }

      if (!agreeTerms) {
        validationErrors.agreeTerms = "Agree to terms is required";
      }
    } else if (step === 0) {
      // Validation for Step 1
      if (!email) {
        validationErrors.email = "Email is required";
      }

      if (!password) {
        validationErrors.password = "Password is required";
      }
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (step === 1) {
        const createRequest = {
          name: name,
          email: email,
          password: password,
          sectors: selectedSectors,
          agreeToTerms: agreeTerms,
        };
        createUser(createRequest);
      } else if (step === 0) {
        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  return (
    <ParentWrapper>
      <Container>
        <form onSubmit={handleFormSubmit}>
          {step === 1 && (
            <>
              <h2 style={{ textAlign: "center" }}>STEP 2</h2>
              <h2>
                Please enter your name and pick the Sectors you are currently
                involved in.
              </h2>
              <FormGroup>
                <Label>Name:</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {isSubmitting && errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Sectors:</Label>
                <Multiselect
                  displayValue="key"
                  groupBy="group"
                  selectedValues={selectedSectors}
                  onSelect={(data) => setSelectedSectors(data)}
                  options={getDropDowns()}
                />
                {isSubmitting && errors.sectors && (
                  <div style={{ color: "red" }}>{errors.sectors}</div>
                )}
              </FormGroup>
              <FormGroup>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                  />
                  I agree to the terms and conditions
                </CheckboxLabel>
                {isSubmitting && errors.agreeTerms && (
                  <div style={{ color: "red" }}>{errors.agreeTerms}</div>
                )}
              </FormGroup>
              <Button type="submit"> {isLoading ? "Saving..." : "Save"}</Button>
            </>
          )}
          {step === 0 && (
            <div style={{ minWidth: "290px" }}>
              <h2 style={{ textAlign: "center" }}>Step 1</h2>
              <FormGroup>
                <Label>Email:</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {isSubmitting && errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Password:</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {isSubmitting && errors.password && (
                  <div style={{ color: "red" }}>{errors.password}</div>
                )}
              </FormGroup>
              <Button onClick={handleFormSubmit} type="button">
                Next
              </Button>
            </div>
          )}
        </form>
      </Container>
    </ParentWrapper>
  );
};
