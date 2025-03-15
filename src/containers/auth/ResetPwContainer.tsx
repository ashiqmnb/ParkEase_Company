import { useNavigate } from "react-router-dom";
import AuthBgImage from "../../components/auth/AuthBgImage";
import ResetPwForm from "../../components/auth/ResetPwForm";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetpw } from "../../api/auth";
import { ResetPwCredentials } from "../../types/authTypes";

const ResetPwContainer = () => {


   const navigate = useNavigate();
   const email = localStorage.getItem('email');

   const validationSchema = yup.object({
      password: yup
         .string()
         .min(8, 'Password should be of minimum 8 characters length')
         .matches(
             /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
             'Password must contain at least one letter, one capital letter, one number, and one special character.'
           )
         .required('Password is required'),
      confirmPassword: yup
         .string()
         .oneOf([yup.ref('password'), undefined], 'Passwords must match')
         .required('Confirm password is required'),
   });

   const resetPwMutation = useMutation({
      mutationFn: resetpw,
      onSuccess:(data)=>{
         console.log('Reset password successful:', data);
         toast.success("Reset Password Successfull");
         setTimeout(() => {
            navigate('/auth/login')
         }, 3000);
      },
      onError:(err)=>{
         console.log("errr",err)
      }
   })

   const formik = useFormik({
      initialValues: {
         password: '',
         confirmPassword:''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
         const credentials:ResetPwCredentials = {
            email: email || "",
            newPassword : values.password
         }
         console.log("credentials", credentials)

         resetPwMutation.mutate(credentials);
      },
  });


   return (
      <AuthBgImage>
         <ResetPwForm
            formik={formik}
            isPending={resetPwMutation.isPending}
            />
      </AuthBgImage>
   );
};

export default ResetPwContainer;
