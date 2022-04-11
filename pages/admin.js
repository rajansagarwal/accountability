import Head from 'next/head';
import { Auth, Typography, Button } from "@supabase/ui";
const { Text } = Typography;
import { supabase } from '../api';

function Profile(props) {
    const { user } = Auth.useUser();
    if (user)
      return (    
        <div className='m-[15vmin]'>
          <Head>
            <title>Admin</title>
          </Head>
          <Text>Signed in: {user.email}</Text><br/><br/>
          <Button block onClick={() => props.supabaseClient.auth.signOut()}>
            Sign out
          </Button>
        </div>
      );
    return props.children 
}

export default function AuthProfile() {
    return (
        <Auth.UserContextProvider supabaseClient={supabase}>
          <Profile supabaseClient={supabase}>
            <Auth supabaseClient={supabase} />
          </Profile>
        </Auth.UserContextProvider>
    )
}