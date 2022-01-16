import {useEffect, useState} from "react";
import {useMoralis} from "react-moralis";
import { useRouter } from "next/router";

export default function useAuth() {
  const [_user, setUser] = useState(null)
  const { user } = useMoralis()
  const router = useRouter()
  
  useEffect(() => {
    if (!(user)) {
      router.push('/unauthorized')
    }
  }, [user])

  if (user) {
    setUser(user)
  }
  
  return _user
}
