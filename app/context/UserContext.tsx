'use client'
import {createContext,useContext,useState,useEffect,ReactNode,useMemo} from "react"
import { UserType } from "@app/profile/[id]/page"
import {useSession} from "next-auth/react"
import { CustomSession } from "@app/dashboard/articles/page"

interface UserContextType{
    user:UserType | null;
    setUser: (user: UserType | null) => void;
    loading:boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: {children:ReactNode}){
const [user,setUser] = useState<UserType | null>(null);
const [loading,setLoading] = useState(true);
const {data:session} = useSession() as {data:CustomSession | null};


const fetchUser = async()=>{
    if (session?.user?.email) {
        try {
          const res = await fetch(`/api/userbyemail`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: session.user.email })
          })
          const data = await res.json()
          setUser(data)
        } catch (error) {
          console.error('Error fetching user:', error)
        } finally {
          setLoading(false)
        }
      }
}

useEffect(()=>{
    fetchUser()
},[session])

const contextValue = useMemo(() => ({user, setUser, loading}), [user, loading]);

return (
    <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
)
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}