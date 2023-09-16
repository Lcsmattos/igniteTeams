import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Groups from "@screens/Groups";
import NewGroups from "@screens/NewGroups";
import Players from "@screens/Players";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />

      <Screen name="new" component={NewGroups} />

      <Screen name="Players" component={Players} />
    </Navigator>
  );
}
