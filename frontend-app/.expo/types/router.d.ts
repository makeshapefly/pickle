/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/account`; params?: Router.UnknownInputParams; } | { pathname: `/accountcreated`; params?: Router.UnknownInputParams; } | { pathname: `/addnewcard`; params?: Router.UnknownInputParams; } | { pathname: `/cache`; params?: Router.UnknownInputParams; } | { pathname: `/changeemail`; params?: Router.UnknownInputParams; } | { pathname: `/changepassword`; params?: Router.UnknownInputParams; } | { pathname: `/changepersonalprofile`; params?: Router.UnknownInputParams; } | { pathname: `/confirmpassword`; params?: Router.UnknownInputParams; } | { pathname: `/createpassword`; params?: Router.UnknownInputParams; } | { pathname: `/forgotpassword`; params?: Router.UnknownInputParams; } | { pathname: `/helpcenter`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/modal`; params?: Router.UnknownInputParams; } | { pathname: `/notifications`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding2`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding3`; params?: Router.UnknownInputParams; } | { pathname: `/pay`; params?: Router.UnknownInputParams; } | { pathname: `/phonenumber`; params?: Router.UnknownInputParams; } | { pathname: `/requestmoney`; params?: Router.UnknownInputParams; } | { pathname: `/resetpassword`; params?: Router.UnknownInputParams; } | { pathname: `/send`; params?: Router.UnknownInputParams; } | { pathname: `/sendmoneysuccess`; params?: Router.UnknownInputParams; } | { pathname: `/signin`; params?: Router.UnknownInputParams; } | { pathname: `/signup`; params?: Router.UnknownInputParams; } | { pathname: `/topup`; params?: Router.UnknownInputParams; } | { pathname: `/verifysignin`; params?: Router.UnknownInputParams; } | { pathname: `/yourcard`; params?: Router.UnknownInputParams; } | { pathname: `/yoursavings`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/phonenumber` | `/phonenumber`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/verifyaccount` | `/verifyaccount`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/history` | `/history`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/statistic` | `/statistic`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `/[...missing]`, params: Router.UnknownInputParams & { missing: (string | number)[]; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/account`; params?: Router.UnknownOutputParams; } | { pathname: `/accountcreated`; params?: Router.UnknownOutputParams; } | { pathname: `/addnewcard`; params?: Router.UnknownOutputParams; } | { pathname: `/cache`; params?: Router.UnknownOutputParams; } | { pathname: `/changeemail`; params?: Router.UnknownOutputParams; } | { pathname: `/changepassword`; params?: Router.UnknownOutputParams; } | { pathname: `/changepersonalprofile`; params?: Router.UnknownOutputParams; } | { pathname: `/confirmpassword`; params?: Router.UnknownOutputParams; } | { pathname: `/createpassword`; params?: Router.UnknownOutputParams; } | { pathname: `/forgotpassword`; params?: Router.UnknownOutputParams; } | { pathname: `/helpcenter`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/login`; params?: Router.UnknownOutputParams; } | { pathname: `/modal`; params?: Router.UnknownOutputParams; } | { pathname: `/notifications`; params?: Router.UnknownOutputParams; } | { pathname: `/onboarding2`; params?: Router.UnknownOutputParams; } | { pathname: `/onboarding3`; params?: Router.UnknownOutputParams; } | { pathname: `/pay`; params?: Router.UnknownOutputParams; } | { pathname: `/phonenumber`; params?: Router.UnknownOutputParams; } | { pathname: `/requestmoney`; params?: Router.UnknownOutputParams; } | { pathname: `/resetpassword`; params?: Router.UnknownOutputParams; } | { pathname: `/send`; params?: Router.UnknownOutputParams; } | { pathname: `/sendmoneysuccess`; params?: Router.UnknownOutputParams; } | { pathname: `/signin`; params?: Router.UnknownOutputParams; } | { pathname: `/signup`; params?: Router.UnknownOutputParams; } | { pathname: `/topup`; params?: Router.UnknownOutputParams; } | { pathname: `/verifysignin`; params?: Router.UnknownOutputParams; } | { pathname: `/yourcard`; params?: Router.UnknownOutputParams; } | { pathname: `/yoursavings`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/phonenumber` | `/phonenumber`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(auth)'}/verifyaccount` | `/verifyaccount`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/history` | `/history`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/statistic` | `/statistic`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } } | { pathname: `/[...missing]`, params: Router.UnknownOutputParams & { missing: string[]; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/account${`?${string}` | `#${string}` | ''}` | `/accountcreated${`?${string}` | `#${string}` | ''}` | `/addnewcard${`?${string}` | `#${string}` | ''}` | `/cache${`?${string}` | `#${string}` | ''}` | `/changeemail${`?${string}` | `#${string}` | ''}` | `/changepassword${`?${string}` | `#${string}` | ''}` | `/changepersonalprofile${`?${string}` | `#${string}` | ''}` | `/confirmpassword${`?${string}` | `#${string}` | ''}` | `/createpassword${`?${string}` | `#${string}` | ''}` | `/forgotpassword${`?${string}` | `#${string}` | ''}` | `/helpcenter${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/login${`?${string}` | `#${string}` | ''}` | `/modal${`?${string}` | `#${string}` | ''}` | `/notifications${`?${string}` | `#${string}` | ''}` | `/onboarding2${`?${string}` | `#${string}` | ''}` | `/onboarding3${`?${string}` | `#${string}` | ''}` | `/pay${`?${string}` | `#${string}` | ''}` | `/phonenumber${`?${string}` | `#${string}` | ''}` | `/requestmoney${`?${string}` | `#${string}` | ''}` | `/resetpassword${`?${string}` | `#${string}` | ''}` | `/send${`?${string}` | `#${string}` | ''}` | `/sendmoneysuccess${`?${string}` | `#${string}` | ''}` | `/signin${`?${string}` | `#${string}` | ''}` | `/signup${`?${string}` | `#${string}` | ''}` | `/topup${`?${string}` | `#${string}` | ''}` | `/verifysignin${`?${string}` | `#${string}` | ''}` | `/yourcard${`?${string}` | `#${string}` | ''}` | `/yoursavings${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/phonenumber${`?${string}` | `#${string}` | ''}` | `/phonenumber${`?${string}` | `#${string}` | ''}` | `${'/(auth)'}/verifyaccount${`?${string}` | `#${string}` | ''}` | `/verifyaccount${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/history${`?${string}` | `#${string}` | ''}` | `/history${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/profile${`?${string}` | `#${string}` | ''}` | `/profile${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/statistic${`?${string}` | `#${string}` | ''}` | `/statistic${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/account`; params?: Router.UnknownInputParams; } | { pathname: `/accountcreated`; params?: Router.UnknownInputParams; } | { pathname: `/addnewcard`; params?: Router.UnknownInputParams; } | { pathname: `/cache`; params?: Router.UnknownInputParams; } | { pathname: `/changeemail`; params?: Router.UnknownInputParams; } | { pathname: `/changepassword`; params?: Router.UnknownInputParams; } | { pathname: `/changepersonalprofile`; params?: Router.UnknownInputParams; } | { pathname: `/confirmpassword`; params?: Router.UnknownInputParams; } | { pathname: `/createpassword`; params?: Router.UnknownInputParams; } | { pathname: `/forgotpassword`; params?: Router.UnknownInputParams; } | { pathname: `/helpcenter`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/login`; params?: Router.UnknownInputParams; } | { pathname: `/modal`; params?: Router.UnknownInputParams; } | { pathname: `/notifications`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding2`; params?: Router.UnknownInputParams; } | { pathname: `/onboarding3`; params?: Router.UnknownInputParams; } | { pathname: `/pay`; params?: Router.UnknownInputParams; } | { pathname: `/phonenumber`; params?: Router.UnknownInputParams; } | { pathname: `/requestmoney`; params?: Router.UnknownInputParams; } | { pathname: `/resetpassword`; params?: Router.UnknownInputParams; } | { pathname: `/send`; params?: Router.UnknownInputParams; } | { pathname: `/sendmoneysuccess`; params?: Router.UnknownInputParams; } | { pathname: `/signin`; params?: Router.UnknownInputParams; } | { pathname: `/signup`; params?: Router.UnknownInputParams; } | { pathname: `/topup`; params?: Router.UnknownInputParams; } | { pathname: `/verifysignin`; params?: Router.UnknownInputParams; } | { pathname: `/yourcard`; params?: Router.UnknownInputParams; } | { pathname: `/yoursavings`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/phonenumber` | `/phonenumber`; params?: Router.UnknownInputParams; } | { pathname: `${'/(auth)'}/verifyaccount` | `/verifyaccount`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/history` | `/history`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/profile` | `/profile`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/statistic` | `/statistic`; params?: Router.UnknownInputParams; } | `/+not-found` | `/${string}` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } } | { pathname: `/[...missing]`, params: Router.UnknownInputParams & { missing: (string | number)[]; } };
    }
  }
}
