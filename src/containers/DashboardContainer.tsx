import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getExpenceRevenue, getRecentTransaction, getSlotStatus, getSubscriptionSummury } from '../api/dashboard'
import SlotsStatus from '../components/dashboard/SlotsStatus'
import ExpenceSubscription from '../components/dashboard/ExpenceSubscription'
import RecentTransactions from '../components/dashboard/RecentTransactions'

const DashboardContainer = () => {


   const { data: slots, isPending: slotPending } = useQuery({
      queryKey:['slots'],
      queryFn: getSlotStatus
   })

   const { data: expenseRevenue, isPending: expencePending } = useQuery({
      queryKey:['expenseRevenue'],
      queryFn: getExpenceRevenue
   })

   const { data: subscription, isPending: subscriptionPending } = useQuery({
      queryKey:['subscription'],
      queryFn: getSubscriptionSummury
   })

   const { data: transaction, isPending: transPending } = useQuery({
      queryKey:['transaction'],
      queryFn: getRecentTransaction
   })

   return (
      <Box sx={{padding:'30px'}}>
         
         <SlotsStatus
            available={slots?.available}
            parked={slots?.parked}
            fourWheeler={slots?.fourWheeler}
            reserved={slots?.reserved}
            total={slots?.total}
            twoWheeler={slots?.twoWheeler}
            slotPending={slotPending}
         />

         <ExpenceSubscription
            expense={expenseRevenue?.expence}
            revenue={expenseRevenue?.revenue}
            expencePending={expencePending}
            status={subscription?.status}
            duration={subscription?.subscriptionDurationInDays}
            expiryDate={subscription?.subscriptionExpiryDate}
            startData={subscription?.subscriptionStartDate}
            subscriptionPending={subscriptionPending}
         />

         <RecentTransactions
            transactions={transaction}
            transPending={transPending}
         />
      </Box>
   )
}

export default DashboardContainer
