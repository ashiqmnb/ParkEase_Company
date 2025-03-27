import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile";
import { ProfileDescription } from "../types/profileTypes";
import { useState } from "react";
import AddressModal from "../components/modals/AddressModal";
import MapAndImages from "../components/profile/MapAndImages";
import LogoutModal from "../components/modals/LogoutModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChangePwModal from "../components/modals/ChangePwModal";
import { changePassword } from "../api/auth";
import { toast } from "sonner";
import { getSlotCount } from "../api/slot";

const ProfileContainer = () => {
   const navigate = useNavigate();
   const [openAddress, setOpenAddress] = useState<boolean>(false);
   const [openLogout, setOpenLogout] = useState<boolean>(false);
   const [openChangePw, setOpenChangePw] = useState<boolean>(false);

   const {data: slotsCount} = useQuery({
      queryKey:['slotsCount'],
      queryFn: getSlotCount
   })

   const changePwMutation = useMutation({
      mutationFn: changePassword,
      onSuccess:()=>{
         toast.success('Password changed successfully');
         setOpenChangePw(false);
         formik.resetForm();
      },
      onError:(err: any)=>{
         toast.error(err.error || 'Something went wrong, please try again later');
         setOpenChangePw(false);
         formik.resetForm()
      }
   })
   
   const formik = useFormik({
      initialValues: {
         currentPassword: "",
         newPassword: "",
      },
      validationSchema: Yup.object({
         currentPassword: Yup.string().required("Current password is required"),
         newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New password is required"),
      }),
      onSubmit: (values) => {
         changePwMutation.mutate(values);
      },
    });

   const handleLogout = () => {
      localStorage.clear();
      navigate("/auth/login");
   };

   const {data: profileData, refetch} = useQuery({
      queryKey:['profileData'],
      queryFn:getProfile,
      enabled: true
   })

   const defaultProfile: ProfileDescription = {
      addressId: "",
      coins: 0,
      description: "",
      district: "",
      email: "",
      isBlocked: false,
      name: "",
      phone: "",
      place: "",
      postalCode: 0,
      profile: "",
      state: "",
      subscriptionStatus: "",
      type: "",
      startDate: "",
      endDate: ""
   };

   const profileDescription: ProfileDescription = profileData?.data
      ? {
            addressId: profileData.data.addressId ?? "",
            coins: profileData.data.coins ?? 0,
            description: profileData.data.description ?? "",
            district: profileData.data.district ?? "",
            email: profileData.data.email ?? "",
            isBlocked: profileData.data.isBlocked ?? false,
            name: profileData.data.name ?? "",
            phone: profileData.data.phone ?? "",
            place: profileData.data.place ?? "",
            postalCode: profileData.data.postalCode ?? "",
            profile: profileData.data.profile ?? "",
            state: profileData.data.state ?? "",
            subscriptionStatus: profileData.data.subscriptionStatus ?? "",
            type: profileData.data.type ?? "",
            startDate: profileData.data.startDate ?? "",
            endDate: profileData.data.endDate ?? "",
        }
      : defaultProfile;

   return (
      <Box sx={{ backgroundColor: "#E6F8F0", padding: "30px" }}>
         <ProfileDetails 
            openAddress={()=>setOpenAddress(true)}
            data={profileDescription}
            openLogout={()=>setOpenLogout(true)}
            refetch={refetch}
            openChangePw={()=>setOpenChangePw(true)}
            twoWheeler={slotsCount?.twoWheeler}
            fourWheeler={slotsCount?.fourWheeler}
         />
         
         <MapAndImages
            images={profileData?.data.images || []}
            latitude={Number(profileData?.data.latitude)}
            longitude={Number(profileData?.data.longitude)}
            addressId={profileData?.data.addressId}
            refetch={refetch}
         />

         <AddressModal 
            refetch={refetch}
            onClose={()=>setOpenAddress(false)}
            open={openAddress}
         />

         <LogoutModal
            open={openLogout}
            onClose={()=>setOpenLogout(false)}
            onConfirm={handleLogout}
         />

         <ChangePwModal 
            open={openChangePw}
            onClose={()=>setOpenChangePw(false)}
            formik={formik}
            isPending={changePwMutation.isPending}
         />
      </Box>
   );
};

export default ProfileContainer;
