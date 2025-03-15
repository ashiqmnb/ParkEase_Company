import { Box } from "@mui/material";
import AuthBgImage from "../../components/auth/AuthBgImage";
import AuthBanner from "../../components/auth/AuthBanner";
import LoginForm from "../../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../api/auth";

const LoginContainer = () => {
   const navigate = useNavigate();

   const loginMutation = useMutation({
      mutationFn: login,
      onSuccess: (res) => {
         localStorage.setItem('coins', res.data.coins)
         localStorage.setItem('profile', res.data.profile)
         localStorage.setItem('token', res.data.token)
         localStorage.setItem('name', res.data.name)
         localStorage.setItem('email', res.data.email)
         localStorage.setItem('subscriptionStatus', res.data.subscriptionStatus)
         localStorage.setItem('type', res.data.type)

         toast.success("Company login successfull")
         setTimeout(() => {
            navigate("/");
         }, 3000);
      },
      onError: (err: any) => {
         toast.error(err.error);
      },
   });

   const validationSchema = yup.object({
      email: yup
         .string()
         .email("Enter a valid email")
         .required("Email is required"),
      password: yup
         .string()
         .min(8, "Password should be of minimum 8 characters length")
         .matches(
         /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
         "Password must contain at least one letter, one capital letter, one number, and one special character."
         )
         .required("Password is required"),
   });
   
   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
         loginMutation.mutate(values);
      },
   });

   return (
      <AuthBgImage>
         <Box
         sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
         }}
         >
         <LoginForm 
            formik={formik}
            isPending={loginMutation.isPending}
            />
         <AuthBanner />
         </Box>
      </AuthBgImage>
   );
};

export default LoginContainer;
