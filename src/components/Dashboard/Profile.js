import React from 'react'
import { Heading } from '@chakra-ui/react'

import UpdateProfileForm from '../UpdateProfileForm'

export default function Profile({ user, userData, handleUserData }) {
  return (
    <>
      <UpdateProfileForm user={user} userData={userData} handleUserData={handleUserData} />
    </>
  )
}
