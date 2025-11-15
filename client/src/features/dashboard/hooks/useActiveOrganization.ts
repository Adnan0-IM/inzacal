import { useContext } from 'react'
import { AuthUIContext } from '@daveyplate/better-auth-ui'

export function useActiveOrganization() {

  const { hooks } = useContext(AuthUIContext)
  const { data: activeOrg } = hooks.useActiveOrganization()

  return activeOrg
}
  
  

