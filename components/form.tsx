import { useState } from "react"; 
import { URL_DATA } from "@/utils/api";
import { Input, Button, Card, Title, Stack } from "@mantine/core";

export default function Form() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    donationAmount: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    donationAmount: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    if (!hasErrors) {
      try {
        const response = await fetch(URL_DATA, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log("Form submitted successfully");
          setFormData(initialFormData);
        } else {
          console.error("Form submission failed");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }

      setIsSubmitting(false); 
    } else {
      setIsSubmitting(false); 
    }

    if (formData.firstName.trim() === "") {
      newErrors.firstName = "First Name is required";
      hasErrors = true;
    }

    if (formData.lastName.trim() === "") {
      newErrors.lastName = "Last Name is required";
      hasErrors = true;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      hasErrors = true;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
      hasErrors = true;
    }

    if (formData.donationAmount.trim() === "") {
      newErrors.donationAmount = "Donation Amount is required";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", formData);
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.firstName}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.lastName}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.email}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <Input
              name="donationAmount"
              value={formData.donationAmount}
              onChange={handleInputChange}
            />
            <Input.Error>{errors.donationAmount}</Input.Error>
          </Input.Wrapper>

          <Button type="submit" >Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}
