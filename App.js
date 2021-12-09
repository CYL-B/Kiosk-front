import React from "react";

// import du pack d'icônes pour la navigation Tab
import { AntDesign } from "@expo/vector-icons";

// initialisation du store redux
import user from "./reducers/user.reducer";
import categoryChosenData from "./reducers/CategoryChoice";
import subCategoryChosenData from "./reducers/subCategoryChoice";
import categorieslist from "./reducers/categorieslist";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
const store = createStore(
  combineReducers({
    user,
    categoryChosenData,
    subCategoryChosenData,
    categorieslist,
  })
);

// import des pages à inclure dans les navigations
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import OfferScreen from './screens/OfferScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen'
import CompanyScreen from './screens/CompanyScreen';

//import des pages du usermenu dans les navigations
import CompanyProfileScreen from './screens/Usermenu/CompanyProfileScreen';
import FavoritesScreen from './screens/Usermenu/FavoritesScreen';
import UserProfileScreen from './screens/Usermenu/UserProfileScreen';
import QuotationScreen from './screens/Usermenu/QuotationScreen';

// import des modules de navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import des composants de navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CompanyPage" component={CompanyScreen} />
      <Stack.Screen name="OfferPage" component={OfferScreen} />
      <Stack.Screen name="CompanyProfile" component={CompanyProfileScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Quotation" component={QuotationScreen} />

      
    </Stack.Navigator>
  );
};

// création de la navigation Tab
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          // mise en place des icones pour chaque bouton de la TabNav
          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Rechercher") {
            iconName = "search1";
          } else if (route.name === "Messages") {
            iconName = "message1";
          }
          return <AntDesign name={iconName} size={25} color={color} />;
        },

        // options d'affichage et couleur de la navigation
        headerShown: false,
        tabBarActiveTintColor: "#F3493E",
        tabBarInactiveTintColor: "#1A0842",
        tabBarStyle: {
          backgroundColor: "#FFFBF7",
          color: "#1A0842",
          height: 70,
        },
        tabBarItemStyle: {
          padding: 10,
        },
      })}
    >
      <Tab.Screen name="Accueil" component={StackNavigation} />
      <Tab.Screen name="Rechercher" component={SearchScreen} />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ tabBarBadge: 3 }}
      />
    </Tab.Navigator>
  );
};

// Export de l'app avec la status bar et la navigation Stack qui précède la connexion de l'utilisateur
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Bienvenue" component={WelcomeScreen} />
          <Stack.Screen name="Connexion" component={LoginScreen} />
          <Stack.Screen name="Inscription" component={RegisterScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
