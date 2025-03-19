import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "../components/profile/ProfileDetails";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile";
import { ProfileDescription } from "../types/profile";
import { useState } from "react";
import AddressModal from "../components/modals/AddressModal";
import MapAndImages from "../components/profile/MapAndImages";

const ProfileContainer = () => {
   const navigate = useNavigate();
   const [openAddress, setOpenAddress] = useState(false);

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
        }
      : defaultProfile;

   return (
      <Box sx={{ backgroundColor: "#E6F8F0", padding: "30px" }}>
         <ProfileDetails 
            openAddress={()=>setOpenAddress(true)}
            data={profileDescription}
            handleLogout={handleLogout}
            refetch={refetch}
               />
         
         <MapAndImages
            images={profileData?.data.images || []}
            latitude={profileData?.data.latitude}
            longitude={profileData?.data.longitude}
            addressId={profileData?.data.addressId}
            refetch={refetch}
            />

         <AddressModal 
            refetch={refetch}
            onClose={()=>setOpenAddress(false)}
            open={openAddress}
            />
      </Box>
   );
};

export default ProfileContainer;
