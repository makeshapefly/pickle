import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { FONTS } from '../constants/fonts';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from './cache'

import { StateProvider } from './(auth)/UserStateContext'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export default function RootLayout() {
  const [loaded, error] = useFonts(FONTS);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <StateProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)/verifyaccount" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding3" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="signup" options={{ headerShown: false }} />
              <Stack.Screen name="signin" options={{ headerShown: false }} />
              <Stack.Screen name="phonenumber" options={{ headerShown: false }} />
              <Stack.Screen name="verifyaccount" options={{ headerShown: false }} />
              <Stack.Screen name="forgotpassword" options={{ headerShown: false }} />
              <Stack.Screen name="resetpassword" options={{ headerShown: false }} />
              <Stack.Screen name="account" options={{ headerShown: false }} />
              <Stack.Screen name="accountcreated" options={{ headerShown: false }} />
              <Stack.Screen name="createpassword" options={{ headerShown: false }} />
              <Stack.Screen name="confirmpassword" options={{ headerShown: false }} />
              <Stack.Screen name="notifications" options={{ headerShown: false }} />
              <Stack.Screen name="requestmoney" options={{ headerShown: false }} />
              <Stack.Screen name="pay" options={{ headerShown: false }} />
              <Stack.Screen name="topup" options={{ headerShown: false }} />
              <Stack.Screen name="yourcard" options={{ headerShown: false }} />
              <Stack.Screen name="addnewcard" options={{ headerShown: false }} />
              <Stack.Screen name="yoursavings" options={{ headerShown: false }} />
              <Stack.Screen name="send" options={{ headerShown: false }} />
              <Stack.Screen name="sendmoneysuccess" options={{ headerShown: false }} />
              <Stack.Screen name="changeemail" options={{ headerShown: false }} />
              <Stack.Screen name="changepassword" options={{ headerShown: false }} />
              <Stack.Screen name="changepersonalprofile" options={{ headerShown: false }} />
              <Stack.Screen name="helpcenter" options={{ headerShown: false }} />
              <Stack.Screen name="setupuserdetails" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </StateProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
