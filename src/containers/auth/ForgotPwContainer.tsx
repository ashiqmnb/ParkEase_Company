import { useNavigate } from "react-router-dom";
import AuthBgImage from "../../components/auth/AuthBgImage";
import ForgotPwForm from "../../components/auth/ForgotPwForm";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { forgotPw } from "../../api/auth";

const ForgotPwContainer = () => {
   const navigate = useNavigate();

   const validationSchema = yup.object({
      email: yup
         .string()
         .email("Enter a valid email")
         .required("Email is required"),
   });

   const formik = useFormik({
      initialValues: {
         email: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
         localStorage.setItem("email", values.email);
         forgotPwMutation.mutate(values.email);
      },
   });

   const forgotPwMutation = useMutation({
      mutationFn: forgotPw,
      onSuccess: (res) => {
         console.log("OTP Sended Successfully", res);
         toast.success(res.data);
         setTimeout(() => {
         navigate("/auth/verifyotp?type=reset");
         }, 2000);
      },
      onError: (error: any) => {
         if (error.error) toast.error(error.error);
      },
   });

   return (
      <AuthBgImage>
         <ForgotPwForm formik={formik} isLoading={forgotPwMutation.isPending} />
      </AuthBgImage>
   );
};

export default ForgotPwContainer;
