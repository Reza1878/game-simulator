import useToast from "@/hooks/useToast";
import ContactUsService from "@/service/contact-us-service";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Text } from "./common";
import { FormControl } from "./form";

const schema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("This field is required"),
  subject: yup.string().required("This field is required"),
  message: yup.string().required("This field is required"),
});

function ContactUsForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showInvalidRequestToast, showToast } = useToast();

  const getFormAttr = (label, name, id) => {
    return {
      label,
      name,
      id,
      register,
      error: !!errors[name],
      helperText: errors[name]?.message,
    };
  };

  const onSubmit = async (val) => {
    try {
      setIsSubmitting(true);
      await ContactUsService.sendMail(val);
      showToast("Email sent!");
      reset();
    } catch (error) {
      console.log(error);
      showInvalidRequestToast(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Text bold variant="h1" className="mb-2 text-white">
        Contact Us
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          LabelProps={{ className: "text-white" }}
          {...getFormAttr("Subject", "subject", "subject")}
        />
        <FormControl
          LabelProps={{ className: "text-white" }}
          {...getFormAttr("Email", "email", "email")}
          type="email"
        />
        <FormControl
          LabelProps={{ className: "text-white" }}
          {...getFormAttr("Message", "message", "message")}
          multiline
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          variant="filled"
          color="blue-gradient"
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default ContactUsForm;
