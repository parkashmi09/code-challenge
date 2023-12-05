import React, { useEffect, useState } from "react";
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
import toast from "react-hot-toast";

const EditForm = () => {
  const [name, setName] = useState("");
  const [sectors, setSectors] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [userId, setUserId] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    sectors: "",
    agreeTerms: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const handleEditRequest = async (payload) => {
    setIsLoading(true); 
    try {
      const response = await axios.put(
        `http://localhost:5001/api/users/${userId}`,
        payload
      );
      if (response.status === 200) {
        setIsLoading(false)
        toast.success(response?.data?.message)
        localStorage.clear();
        const { user, token } = response.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (error) {
        setIsLoading(false)
      console.log("error", error);
    }
  };

  const fetchSectors = async () => {

    try {
      const response = await axios.get("http://localhost:5001/api/selectors");
      if (response) {
        setSectors(response?.data?.data);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("something went Wrong!")
    }
  };

  const getValues = () => {
    const users = JSON.parse(localStorage.getItem("user"));
    setName(users?.name);
    setSelectedSectors(users?.sectors);
    setAgreeTerms(users?.agreeToTerms);
    setUserId(users?._id);
  };

  useEffect(() => {
    fetchSectors();
    getValues();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (selectedSectors.length === 0) {
      validationErrors.sectors = "Sectors are required";
    }

    if (!agreeTerms) {
      validationErrors.agreeTerms = "Agree to terms is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const createRequest = {
        name: name,
        sectors: selectedSectors,
        agreeToTerms: agreeTerms,
      };
      handleEditRequest(createRequest);
    }
  };

  return (
    <ParentWrapper>
      <Container>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name:</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
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
            {errors.sectors && (
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
            {errors.agreeTerms && (
              <div style={{ color: "red" }}>{errors.agreeTerms}</div>
            )}
          </FormGroup>
          <Button type="submit">{isLoading ? "Saving..." : "Save"}</Button>
        </form>
      </Container>
    </ParentWrapper>
  );
};

export default EditForm;
